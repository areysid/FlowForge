import { useTRPC } from "@/trpc/client"
import { useMutation, useMutationState, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useExecutionsParams } from "./use-executions-params";
import { CredentialType } from "@/generated/prisma/enums";

//Hook to fetch all credentials 

export const useSuspenseExecutions = () => {
    const trpc = useTRPC();
    const [params] = useExecutionsParams();

    return useSuspenseQuery(trpc.executions.getMany.queryOptions(params));
};

//Hook to fetch single credential suspense

export const useSuspenseExecution = (id: string) => {
    const trpc = useTRPC();
    
    return useSuspenseQuery(trpc.executions.getOne.queryOptions({ id }));
};


