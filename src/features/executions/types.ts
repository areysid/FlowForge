import type { GetStepTools, Inngest } from "inngest";

export type WorkflowContent = Record<string, unknown>;

export type StepTools = GetStepTools<Inngest.Any>;

export interface NodeExecutorParams<TData = Record<string, unknown>>{
    data: TData;
    nodeId: string;
    context: WorkflowContent;
    step: StepTools;
    //publish: TODO add realtime later
};

export type NodeExecutor<TData = Record<string, unknown>>= (
    params: NodeExecutorParams<TData>,
)=>Promise<WorkflowContent>;