// src/middleware/middleware-flow.ts

import "server-only";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ROUTE_ACCESS_CONFIG } from "@/lib/config";
import { resolveRequestSession } from "@/lib/server";
import { evaluateAccess } from "./access-policy";
import { resolveRouteRule } from "./route-policy";

function withNoStore(response: NextResponse): NextResponse {
    response.headers.set("Cache-Control", "no-store");

    return response;
}

/** Control preliminar de navegación; NestJS sigue autorizando los datos. */
export async function decideMiddleware(
    request: NextRequest,
): Promise<NextResponse> {
    const pathname = request.nextUrl.pathname;
    const rule = resolveRouteRule(pathname);
    const session = await resolveRequestSession(request);
    const decision = evaluateAccess(rule, session, ROUTE_ACCESS_CONFIG);

    if (decision.kind === "allow") return withNoStore(NextResponse.next());

    const url = new URL(decision.to, request.url);

    return withNoStore(NextResponse.redirect(url));
}
