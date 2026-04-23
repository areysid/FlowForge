"use server";
import { getSubscriptionToken, type Realtime } from "@inngest/realtime";
import { inngest } from "@/inngest/client";
import { stripeTriggerChannel } from "@/inngest/channels/stripe-trigger";

export type StripeTriggerChannel = Realtime.Token<
  typeof stripeTriggerChannel,
  ["status"]
>;


export async function fetchStripeTriggerRealtimeToken():
Promise<StripeTriggerChannel> {
    const token = await getSubscriptionToken(inngest, {
        channel: stripeTriggerChannel(),
        topics: ["status"],
    }); 
    return token;
}