import { inngest } from "@/inngest/client";
import { sendWorkflowExecution } from "@/inngest/utils";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    try{
        const url = new URL(request.url);
        const workflowId = url.searchParams.get("workflowId");

        if(!workflowId){
            return NextResponse.json(
                { success: false, error: "Missing requeired query parameter:w workflowId" },
                { status: 400 },
            );
        };
        const body = await request.json();
        console.log("FULL WEBHOOK BODY:", JSON.stringify(body, null, 2));
        const formData = {
            formId: body.formId,
            formTitle: body.formTitle,
            responseId: body.responseId,
            timestamp: body.timestamp,
            respondentEmail: body.respondentEmail,
            response: body.responses,
            raw: body,
        };


        // Trigger an inngest job

        await sendWorkflowExecution({
            workflowId,
            initialData:{
                googleForm: formData,
            },
        });

        return NextResponse.json({ 
            success: true, 
            message: "Webhook processed and workflow triggered" 
        });
    }catch (error){
        console.error("Google Form webhook error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to process Google Form submission" },
            { status:500 }
        )
    }
}