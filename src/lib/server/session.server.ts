// src/lib/server/session.server.ts
//
import "server-only";

import type { JWTPayload } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { Role } from "@/core/enums";
import { SECURITY_CONFIG } from "../config";
import { verifyAccessJwt } from "./jwt.server";

export type Session = {
    subject: string;
    role: Role;
    claims: JWTPayload & { sub: string; role: string };
};

export type SessionStatus =
    "authenticated" | "anonymous" | "expired" | "invalid";

export type SessionState =
    | { status: "authenticated"; session: Session }
    | {
          status: Exclude<SessionStatus, "authenticated">;
          session: null;
      };

function isRole(value: unknown): value is Role {
    return (
        typeof value === "string" &&
        (Object.values(Role) as string[]).includes(value)
    );
}

async function resolveAccessToken(
    token: string | null | undefined,
): Promise<SessionState> {
    if (!token) return { status: "anonymous", session: null };

    const result = await verifyAccessJwt(token);

    if (!result.ok) return { status: result.reason, session: null };

    const { sub, role } = result.payload;

    if (typeof sub !== "string" || !sub.trim())
        return { status: "invalid", session: null };

    if (!isRole(role)) return { status: "invalid", session: null };

    return {
        status: "authenticated",
        session: {
            subject: sub,
            role,
            claims: result.payload as JWTPayload & {
                sub: string;
                role: string;
            },
        },
    };
}

/** Para NextRequest: proxy.ts y guards. */
export function resolveRequestSession(
    request: NextRequest,
): Promise<SessionState> {
    const token = request.cookies.get(
        SECURITY_CONFIG.authCookieNames.accessToken,
    )?.value;

    return resolveAccessToken(token);
}

/** Para Server Components, Server Actions y Route Handlers. */
export async function getServerSession(): Promise<Session | null> {
    const cookieStore = await cookies();

    const token = cookieStore.get(
        SECURITY_CONFIG.authCookieNames.accessToken,
    )?.value;

    const state = await resolveAccessToken(token);

    return state.session;
}

/** Exige una sesión válida y redirige si no existe. */
export async function requireServerSession(
    redirectTo: string,
): Promise<Session> {
    if (
        !redirectTo.startsWith("/") ||
        redirectTo.startsWith("//") ||
        /[\\\r\n]/.test(redirectTo)
    )
        throw new Error("redirectTo debe ser una ruta interna absoluta");

    const session = await getServerSession();

    if (!session) redirect(redirectTo);

    return session;
}
