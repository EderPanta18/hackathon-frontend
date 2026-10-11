const isProduction = process.env.NODE_ENV === "production";

export const SECURITY_CONFIG = {
    authCookieNames: {
        accessToken: process.env.AUTH_ACCESS_COOKIE_NAME ?? "accessToken",
    },

    jwt: {
        issuer: process.env.JWT_ISSUER || undefined,
        audience: process.env.JWT_AUDIENCE || undefined,
    },

    /**
     * Autenticación local exclusiva de desarrollo.
     * Nunca habilitable en producción; `security.server.ts` lo revalida.
     */
    devAuth: {
        enabled: !isProduction && process.env.DEV_AUTH_ENABLED === "true",
    },
} as const;
