// src/proxy.ts

import type { NextRequest } from "next/server";
import { decideMiddleware } from "@/middleware";

export function proxy(request: NextRequest) {
    return decideMiddleware(request);
}

export const config = {
    matcher: [
        // Excluye BFF y dev-auth; luego assets con extensión.
        "/((?!api/backend(?:/|$)|api/dev-auth(?:/|$)|_next(?:/|$)|favicon\\.ico$|robots\\.txt$|sitemap\\.xml$|.*\\..*).*)",
        "/comuna/:path*",
        "/ong/:path*",
        "/brigada/:path*",
        "/defensa-civil/:path*",
    ],
};
