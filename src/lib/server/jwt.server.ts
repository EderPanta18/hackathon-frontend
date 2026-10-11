// src/lib/server/jwt.server.ts

import "server-only";

import { errors, jwtVerify, type JWTPayload } from "jose";
import { SECURITY_CONFIG } from "../config";
import {
    getAccessTokenVerificationSource,
    getDevAuthVerificationSource,
} from "./security.server";

export type JwtVerificationResult =
    | { ok: true; payload: JWTPayload }
    | { ok: false; reason: "expired" | "invalid" };

type VerificationSource = ReturnType<
    typeof getAccessTokenVerificationSource
> & { issuer?: string };

/**
 * Fuentes disponibles en este proceso.
 * Una fuente mal configurada (secreto ausente o demasiado corto) se omite:
 * el resultado es fail-closed, no un crash.
 */
function resolveSources(): readonly VerificationSource[] {
    const sources: VerificationSource[] = [];

    try {
        sources.push(getAccessTokenVerificationSource());
    } catch {
        // Fuente real no disponible en este entorno.
    }

    if (SECURITY_CONFIG.devAuth.enabled) {
        try {
            sources.push(getDevAuthVerificationSource());
        } catch {
            // Fuente dev mal configurada; se omite.
        }
    }

    return sources;
}

export async function verifyAccessJwt(
    token: string,
): Promise<JwtVerificationResult> {
    const sources = resolveSources();

    if (sources.length === 0)
        // Sin fuentes válidas no se puede verificar nada: fail-closed.
        return { ok: false, reason: "invalid" };

    let sawExpired = false;

    for (const source of sources) {
        try {
            const { payload } = await jwtVerify(token, source.key, {
                algorithms: [source.algorithm],
                requiredClaims: ["exp"],
                clockTolerance: 5,
                ...(source.issuer
                    ? { issuer: source.issuer }
                    : SECURITY_CONFIG.jwt.issuer
                      ? { issuer: SECURITY_CONFIG.jwt.issuer }
                      : {}),
                ...(SECURITY_CONFIG.jwt.audience
                    ? { audience: SECURITY_CONFIG.jwt.audience }
                    : {}),
            });

            return { ok: true, payload };
        } catch (error: unknown) {
            if (error instanceof errors.JWTExpired) {
                sawExpired = true;

                continue;
            }

            if (error instanceof errors.JOSEError) continue;

            throw error;
        }
    }

    return { ok: false, reason: sawExpired ? "expired" : "invalid" };
}
