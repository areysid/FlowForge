import { inngest } from "@/inngest/client";
import { sendWorkflowExecution } from "@/inngest/utils";
import { type NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const workflowId = url.searchParams.get("workflowId");

    if (!workflowId) {
      return NextResponse.json(
        { success: false, error: "Missing required query parameter: workflowId" },
        { status: 400 },
      );
    }

    const rawBody = await request.text();

    // Verify Razorpay webhook signature
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (webhookSecret) {
      const signature = request.headers.get("x-razorpay-signature");
      if (!signature) {
        return NextResponse.json(
          { success: false, error: "Missing signature" },
          { status: 401 },
        );
      }

      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(rawBody)
        .digest("hex");

      if (signature !== expectedSignature) {
        return NextResponse.json(
          { success: false, error: "Invalid signature" },
          { status: 401 },
        );
      }
    }

    const body = JSON.parse(rawBody);

    const razorpayData = {
      eventId: body.payload?.payment?.entity?.id ?? body.payload?.order?.entity?.id,
      eventType: body.event,
      timestamp: body.created_at,
      accountId: body.account_id,
      // Payment specific
      amount: body.payload?.payment?.entity?.amount,
      currency: body.payload?.payment?.entity?.currency,
      status: body.payload?.payment?.entity?.status,
      orderId: body.payload?.payment?.entity?.order_id,
      email: body.payload?.payment?.entity?.email,
      contact: body.payload?.payment?.entity?.contact,
      method: body.payload?.payment?.entity?.method,
      raw: body.payload,
    };

    await sendWorkflowExecution({
      workflowId,
      initialData: {
        razorpay: razorpayData,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Razorpay webhook error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process Razorpay event" },
      { status: 500 },
    );
  }
}