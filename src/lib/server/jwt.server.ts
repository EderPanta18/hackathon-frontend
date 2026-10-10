import "server-only";

import { errors, jwtVerify, type JWTPayload } from "jose";
import { SECURITY_CONFIG } from "../config";
import { getAccessTokenVerificationSource } from "./security.server";

export type JwtVerificationResult =
    | { ok: true; payload: JWTPayload }
    | { ok: false; reason: "expired" | "invalid" };

export async function verifyAccessJwt(
    token: string,
): Promise<JwtVerificationResult> {
    const source = getAccessTokenVerificationSource();

    try {
        const { payload } = await jwtVerify(token, source.key, {
            algorithms: [source.algorithm],
            requiredClaims: ["exp"],
            clockTolerance: 5,
            ...(SECURITY_CONFIG.jwt.issuer
                ? { issuer: SECURITY_CONFIG.jwt.issuer }
                : {}),
            ...(SECURITY_CONFIG.jwt.audience
                ? { audience: SECURITY_CONFIG.jwt.audience }
                : {}),
        });

        return { ok: true, payload };
    } catch (error: unknown) {
        if (error instanceof errors.JWTExpired)
            return { ok: false, reason: "expired" };

        if (error instanceof errors.JOSEError)
            return { ok: false, reason: "invalid" };

        throw error;
    }
}
