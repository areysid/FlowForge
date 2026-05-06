"use client";

import { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../base-triggers-node";
import { RazorpayTriggerDialog } from "./dialog";
import { useNodeStatus } from "@/features/executions/hooks/use-node-status";
import { fetchRazorpayTriggerRealtimeToken } from "./actions";
import { RAZORPAY_TRIGGER_CHANNEL_NAME } from "@/inngest/channels/razorpay-trigger";

export const RazorpayTriggerNode = memo((props: NodeProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const nodeStatus = useNodeStatus({
    nodeId: props.id,
    channel: RAZORPAY_TRIGGER_CHANNEL_NAME,
    topic: "status",
    refreshToken: fetchRazorpayTriggerRealtimeToken,
  });

  const handleOpenSettings = () => setDialogOpen(true);

  return (
    <>
      <RazorpayTriggerDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <BaseTriggerNode
        {...props}
        icon="/logos/razorpay.svg"
        name="Razorpay"
        description="When Razorpay payment event is captured"
        status={nodeStatus}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
});