// src/app/api/dev-auth/sign-in/route.ts

import { Role } from "@/core/enums";
import {
    isDevAuthEnabled,
    signDevAuthToken,
    setDevAuthCookie,
} from "@/modules/dev-auth/dev-auth.server";

function notFound(): Response {
    return new Response(null, { status: 404 });
}

function badRequest(): Response {
    return new Response(null, { status: 400 });
}

export async function POST(request: Request): Promise<Response> {
    if (!isDevAuthEnabled()) return notFound();

    let body: unknown;

    try {
        body = await request.json();
    } catch {
        return badRequest();
    }

    const role = (body as { role?: unknown } | null)?.role;

    if (
        typeof role !== "string" ||
        !(Object.values(Role) as string[]).includes(role)
    )
        return badRequest();

    const token = await signDevAuthToken(role as Role);
    const response = new Response(null, { status: 204 });

    setDevAuthCookie(response, token);

    return response;
}

export function GET(): Response {
    return new Response(null, { status: 405, headers: { Allow: "POST" } });
}
