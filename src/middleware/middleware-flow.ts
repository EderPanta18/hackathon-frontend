import "server-only";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ROUTE_ACCESS_CONFIG } from "@/lib/config";
import { resolveRequestSession } from "@/lib/server";
import { resolveRouteAccess } from "./route-policy";

function denyUnauthenticated(request: NextRequest): NextResponse {
    const signInPath = ROUTE_ACCESS_CONFIG.signInPath;

    // Sin pantalla de login definida, fallar cerrado en lugar de inventar rutas.
    if (!signInPath)
        return new NextResponse(null, {
            status: 401,
            headers: { "Cache-Control": "no-store" },
        });

    // Evitar una redirección infinita por configuración incorrecta.
    if (
        !signInPath.startsWith("/") ||
        signInPath.startsWith("//") ||
        signInPath.includes("\\") ||
        request.nextUrl.pathname === signInPath ||
        resolveRouteAccess(signInPath) !== "public"
    )
        throw new Error(
            "La ruta de inicio de sesión debe ser pública e interna",
        );

    const url = new URL(signInPath, request.url);
    url.searchParams.set(
        "next",
        `${request.nextUrl.pathname}${request.nextUrl.search}`,
    );

    const response = NextResponse.redirect(url);
    response.headers.set("Cache-Control", "no-store");

    return response;
}

/** Control preliminar de navegación; NestJS sigue autorizando los datos. */
export async function decideMiddleware(
    request: NextRequest,
): Promise<NextResponse> {
    const access = resolveRouteAccess(request.nextUrl.pathname);

    if (access === "public") return NextResponse.next();

    const state = await resolveRequestSession(request);

    if (state.status === "authenticated") return NextResponse.next();

    return denyUnauthenticated(request);
}
