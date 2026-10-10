export const SECURITY_CONFIG = {
    authCookieNames: {
        accessToken: process.env.AUTH_ACCESS_COOKIE_NAME ?? "accessToken",
    },

    jwt: {
        issuer: process.env.JWT_ISSUER || undefined,
        audience: process.env.JWT_AUDIENCE || undefined,
    },
} as const;
