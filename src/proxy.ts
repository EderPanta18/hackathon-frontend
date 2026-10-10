import type { NextRequest } from "next/server";
import { decideMiddleware } from "@/middleware";

export function proxy(request: NextRequest) {
    return decideMiddleware(request);
}

export const config = {
    matcher: [
        "/((?!api/backend(?:/|$)|_next(?:/|$)|favicon\\.ico$|robots\\.txt$|sitemap\\.xml$|.*\\..*).*)",
    ],
};
