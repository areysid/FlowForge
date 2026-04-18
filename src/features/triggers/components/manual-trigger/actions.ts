"use server";
import { httpRequestChannel } from "@/inngest/channels/http-request";
import { getSubscriptionToken, type Realtime } from "@inngest/realtime";
import { inngest } from "@/inngest/client";
import { manualTriggerChannel } from "@/inngest/channels/manual-trigger";

export type ManualTriggerChannel = Realtime.Token<
  typeof manualTriggerChannel,
  ["status"]
>;


export async function fetchManualTriggerRealtimeToken():
Promise<ManualTriggerChannel> {
    const token = await getSubscriptionToken(inngest, {
        channel: manualTriggerChannel(),
        topics: ["status"],
    }); 
    return token;
}