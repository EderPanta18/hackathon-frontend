export const API_PROXY_PREFIX = "/api/backend";

export const API_CONFIG = {
    proxyRoutePrefix: API_PROXY_PREFIX,
    requestTimeoutMs: 30_000,
    maxRetryAttempts: 0,
} as const;
