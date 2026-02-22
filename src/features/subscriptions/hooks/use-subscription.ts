import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

export const UseSubscription = () => {
    return useQuery({
        queryKey: ["subscription"],
        queryFn: async () => {
            const { data } = await authClient.customer.state();
            return data;
        },
    });
};

export const useHasActiveSubcription = () => {
    const { data: customerState, isLoading, ...rest } = UseSubscription();

    const hasActiveSubcription = customerState?.activeSubscriptions && customerState.activeSubscriptions.length > 0;

    return {
        hasActiveSubcription,
        subscription: customerState?.activeSubscriptions?.[0],
        isLoading,
        ...rest,
    };
}