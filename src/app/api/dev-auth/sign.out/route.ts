// src/app/api/dev-auth/sign-out/route.ts

import {
    clearDevAuthCookie,
    isDevAuthEnabled,
} from "@/modules/dev-auth/dev-auth.server";

export async function POST(): Promise<Response> {
    if (!isDevAuthEnabled()) return new Response(null, { status: 404 });

    const response = new Response(null, { status: 204 });

    clearDevAuthCookie(response);

    return response;
}

export function GET(): Response {
    return new Response(null, { status: 405, headers: { Allow: "POST" } });
}
