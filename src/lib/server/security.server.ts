// src/lib/server/security.server.ts

import "server-only";

const DEV_AUTH_ISSUER = "dev-auth" as const;

export function getAccessTokenVerificationSource() {
    const secret = process.env.JWT_ACCESS_SECRET;

    if (!secret) throw new Error("JWT_ACCESS_SECRET no está configurado");

    const key = new TextEncoder().encode(secret);

    if (key.byteLength < 32)
        throw new Error("JWT_ACCESS_SECRET debe tener al menos 32 bytes");

    return {
        type: "shared-secret",
        algorithm: "HS256",
        key,
    } as const;
}

/**
 * Fuente adicional para tokens de desarrollo.
 * Falla cerrado si intenta habilitarse en producción o si la clave
 * coincide con la real (aislamiento respecto al backend NestJS).
 */
export function getDevAuthVerificationSource() {
    if (process.env.NODE_ENV === "production")
        throw new Error("DEV_AUTH no puede habilitarse en producción");

    const secret = process.env.DEV_AUTH_SECRET;

    if (!secret) throw new Error("DEV_AUTH_SECRET no está configurado");

    if (secret === process.env.JWT_ACCESS_SECRET)
        throw new Error(
            "DEV_AUTH_SECRET no puede coincidir con JWT_ACCESS_SECRET",
        );

    const key = new TextEncoder().encode(secret);

    if (key.byteLength < 32)
        throw new Error("DEV_AUTH_SECRET debe tener al menos 32 bytes");

    return {
        type: "shared-secret",
        algorithm: "HS256",
        key,
        issuer: DEV_AUTH_ISSUER,
    } as const;
}

export { DEV_AUTH_ISSUER };
