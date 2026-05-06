"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RazorpayTriggerDialog = ({ open, onOpenChange }: Props) => {
  const params = useParams();
  const workflowId = params.workflowId as string;

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";
  const webhookUrl = `${baseUrl}/api/webhooks/razorpay?workflowId=${workflowId}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(webhookUrl);
      toast.success("Webhook URL copied to clipboard");
    } catch {
      toast.error("Failed to copy URL");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Razorpay Trigger Configuration</DialogTitle>
          <DialogDescription>
            Configure this webhook URL in your Razorpay Dashboard to trigger this workflow on payment events.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <div className="flex gap-2">
              <Input
                id="webhook-url"
                value={webhookUrl}
                readOnly
                className="font-mono text-sm"
              />
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={copyToClipboard}
              >
                <CopyIcon className="size-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-lg bg-muted p-4 space-y-2">
            <h4 className="font-medium text-sm">Setup Instructions</h4>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Open your Razorpay Dashboard</li>
              <li>Go to Settings → Webhooks</li>
              <li>Click "Add New Webhook"</li>
              <li>Paste the webhook URL above</li>
              <li>Set a Secret and add it as <code className="bg-background px-1 py-0.5 rounded">RAZORPAY_WEBHOOK_SECRET</code> in your env</li>
              <li>Select events (e.g., payment.captured, order.paid)</li>
              <li>Save the webhook</li>
            </ol>
          </div>

          <div className="rounded-lg bg-muted p-4 space-y-2">
            <h4 className="font-medium text-sm">Available Variables</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li><code className="bg-background px-1 py-0.5 rounded">{"{{razorpay.amount}}"}</code> - Payment amount (in paise)</li>
              <li><code className="bg-background px-1 py-0.5 rounded">{"{{razorpay.currency}}"}</code> - Currency code</li>
              <li><code className="bg-background px-1 py-0.5 rounded">{"{{razorpay.email}}"}</code> - Customer email</li>
              <li><code className="bg-background px-1 py-0.5 rounded">{"{{razorpay.contact}}"}</code> - Customer phone</li>
              <li><code className="bg-background px-1 py-0.5 rounded">{"{{razorpay.orderId}}"}</code> - Order ID</li>
              <li><code className="bg-background px-1 py-0.5 rounded">{"{{razorpay.eventType}}"}</code> - Event type</li>
              <li><code className="bg-background px-1 py-0.5 rounded">{"{{json razorpay}}"}</code> - Full event data as JSON</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};