import type {
    InvalidateQueryFilters,
    QueryClient,
} from "@tanstack/react-query";

import { resourceKeys, type QueryScope } from "./query-keys";

export interface InvalidateResourceOptions {
    resource: string;
    scope?: QueryScope;
    refetchType?: InvalidateQueryFilters["refetchType"];
}

export function invalidateResourceQueries(
    queryClient: QueryClient,
    { resource, scope, refetchType }: InvalidateResourceOptions,
): Promise<void> {
    return queryClient.invalidateQueries({
        queryKey:
            scope === undefined
                ? resourceKeys.all(resource)
                : resourceKeys.scoped(resource, scope),

        ...(refetchType ? { refetchType } : {}),
    });
}
