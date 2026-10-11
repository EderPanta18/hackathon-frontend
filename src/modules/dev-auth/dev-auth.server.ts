// src/modules/dev-auth/dev-auth.server.ts

import "server-only";

import { SignJWT } from "jose";
import type { Role } from "@/core/enums/user.enums";
import { SECURITY_CONFIG } from "@/lib/config";
import { DEV_AUTH_ISSUER, getDevAuthVerificationSource } from "@/lib/server";
import { DEV_AUTH_COOKIE_MAX_AGE, DEV_IDENTITIES } from "./dev-auth.constants";

export function isDevAuthEnabled(): boolean {
    return SECURITY_CONFIG.devAuth.enabled;
}

export async function signDevAuthToken(role: Role): Promise<string> {
    const source = getDevAuthVerificationSource();
    const identity = DEV_IDENTITIES[role];

    return new SignJWT({ role: identity.role })
        .setProtectedHeader({ alg: source.algorithm })
        .setSubject(identity.sub)
        .setIssuer(DEV_AUTH_ISSUER)
        .setIssuedAt()
        .setExpirationTime(`${DEV_AUTH_COOKIE_MAX_AGE}s`)
        .sign(source.key);
}

function cookieName(): string {
    return SECURITY_CONFIG.authCookieNames.accessToken;
}

export function setDevAuthCookie(response: Response, token: string): void {
    const attributes = [
        `${cookieName()}=${encodeURIComponent(token)}`,
        `Max-Age=${DEV_AUTH_COOKIE_MAX_AGE}`,
        "Path=/",
        "HttpOnly",
        "SameSite=Lax",
        // Sin Secure: dev sobre http://localhost.
    ];

    response.headers.append("Set-Cookie", attributes.join("; "));
}

export function clearDevAuthCookie(response: Response): void {
    const attributes = [
        `${cookieName()}=`,
        "Max-Age=0",
        "Path=/",
        "HttpOnly",
        "SameSite=Lax",
    ];

    response.headers.append("Set-Cookie", attributes.join("; "));
}
