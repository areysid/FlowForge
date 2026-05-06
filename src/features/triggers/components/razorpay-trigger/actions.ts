"use server";
import { getSubscriptionToken, type Realtime } from "@inngest/realtime";
import { inngest } from "@/inngest/client";
import { razorpayTriggerChannel } from "@/inngest/channels/razorpay-trigger";

export type RazorpayTriggerChannel = Realtime.Token<typeof razorpayTriggerChannel, ["status"]>;

export async function fetchRazorpayTriggerRealtimeToken(): Promise<RazorpayTriggerChannel> {
  const token = await getSubscriptionToken(inngest, {
    channel: razorpayTriggerChannel(),
    topics: ["status"],
  });
  return token;
}