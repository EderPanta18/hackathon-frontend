import type { NextRequest } from "next/server";
import { forwardBackendRequest } from "@/lib/bff";
    
type Context = {
    params: Promise<{ path: string[] }>;
};

async function handler(
    request: NextRequest,
    context: Context,
): Promise<Response> {
    const { path } = await context.params;

    return forwardBackendRequest(request, path);
}

export {
    handler as GET,
    handler as HEAD,
    handler as POST,
    handler as PUT,
    handler as PATCH,
    handler as DELETE,
};
