import { QueryClient } from "@tanstack/react-query";
import { ApiError } from "../api";

/** Reintentos solo para consultas con errores potencialmente transitorios. */
function shouldRetryQuery(failureCount: number, error: unknown): boolean {
    if (failureCount >= 1 || !(error instanceof ApiError)) return false;

    if (error.code === "REQUEST_CANCELED") return false;

    return (
        ["NETWORK_ERROR", "REQUEST_TIMEOUT"].includes(error.code) ||
        [408, 429, 500, 502, 503, 504].includes(error.status)
    );
}

export function createQueryClient(): QueryClient {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60_000,
                gcTime: 5 * 60_000,
                retry: shouldRetryQuery,
                refetchOnWindowFocus: false,
                refetchOnReconnect: true,
            },
            mutations: {
                retry: false,
            },
        },
    });
}

let browserQueryClient: QueryClient | undefined;

/** Aislamiento en servidor; instancia persistente en navegador. */
export function getQueryClient(): QueryClient {
    if (typeof window === "undefined") return createQueryClient();

    browserQueryClient ??= createQueryClient();

    return browserQueryClient;
}
