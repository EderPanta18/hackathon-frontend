import "server-only";

import type { NextRequest } from "next/server";
import { API_CONFIG, SECURITY_CONFIG, APP_CONFIG } from "../config";
import { getBackendApiUrl } from "../server";
import { appendAccessCookie } from "./backend-cookie.server";

const REQUEST_HEADERS = [
    "accept",
    "accept-language",
    "content-type",
    "range",
    "if-range",
] as const;

const RESPONSE_HEADERS = [
    "content-type",
    "content-disposition",
    "content-range",
    "accept-ranges",
    "retry-after",
    "x-request-id",
] as const;

const NO_BODY_STATUSES = new Set([204, 205, 304]);
const SAFE_METHODS = new Set(["GET", "HEAD"]);

function problem(status: number, title: string, code: string): Response {
    return Response.json(
        { success: false, type: "about:blank", title, status, code },
        {
            status,
            headers: {
                "Content-Type": "application/problem+json",
                "Cache-Control": "no-store",
            },
        },
    );
}

/**
 * En mutaciones se requiere una señal verificable de mismo origen.
 * Los navegadores modernos envían Origin y/o Sec-Fetch-Site.
 * Solicitudes sin ambos datos se rechazan deliberadamente.
 */
function isSameOriginMutation(request: NextRequest): boolean {
    if (SAFE_METHODS.has(request.method.toUpperCase())) return true;

    const expectedOrigin = APP_CONFIG.appBaseUrl
        ? new URL(APP_CONFIG.appBaseUrl).origin
        : request.nextUrl.origin;
    const origin = request.headers.get("origin");
    const fetchSite = request.headers.get("sec-fetch-site");

    if (origin && origin !== expectedOrigin) return false;

    if (fetchSite && fetchSite !== "same-origin") return false;

    return origin === expectedOrigin || fetchSite === "same-origin";
}

function buildTargetUrl(
    baseUrl: string,
    segments: string[],
    request: NextRequest,
): URL {
    const base = new URL(`${baseUrl.replace(/\/+$/, "")}/`);

    if (base.username || base.password || base.search || base.hash)
        throw new Error(
            "La URL del backend no puede contener credenciales, query ni fragmento",
        );

    // Evitar traversal y rutas ambiguas tras decodificar catch-all params.

    if (
        segments.length === 0 ||
        segments.some(
            (part) =>
                !part ||
                part === "." ||
                part === ".." ||
                part.includes("/") ||
                part.includes("\\") ||
                part.includes("\0"),
        )
    )
        throw new InvalidBackendPath();

    const target = new URL(segments.map(encodeURIComponent).join("/"), base);

    if (
        target.origin !== base.origin ||
        !target.pathname.startsWith(base.pathname)
    )
        throw new InvalidBackendPath();

    target.search = request.nextUrl.search;

    return target;
}

class InvalidBackendPath extends Error {}

function buildRequestHeaders(request: NextRequest): Headers {
    const headers = new Headers();

    for (const key of REQUEST_HEADERS) {
        const value = request.headers.get(key);

        if (value) headers.set(key, value);
    }

    // Evitar respuestas comprimidas antes del streaming/range.
    headers.set("Accept-Encoding", "identity");

    // Solo se reenvía la cookie de autenticación, no cookies ajenas al backend.
    const name = SECURITY_CONFIG.authCookieNames.accessToken;
    const token = request.cookies.get(name)?.value;

    if (token)
        headers.set(
            "Cookie",
            `${encodeURIComponent(name)}=${encodeURIComponent(token)}`,
        );

    return headers;
}

function buildResponseHeaders(
    upstream: Response,
    request: NextRequest,
): Headers {
    const headers = new Headers({ "Cache-Control": "no-store" });

    for (const key of RESPONSE_HEADERS) {
        const value = upstream.headers.get(key);

        if (value) headers.set(key, value);
    }

    // Usar el origen público configurado cuando Next.js está tras un proxy TLS.
    const publicUrl = new URL(APP_CONFIG.appBaseUrl || request.nextUrl.origin);
    appendAccessCookie(upstream.headers, headers, publicUrl);

    return headers;
}

/** Mapea redirecciones internas del backend al BFF; rechaza destinos externos. */
function rewriteLocation(
    rawLocation: string,
    targetUrl: URL,
    baseUrl: string,
    request: NextRequest,
): string | null {
    const originUrl = new URL(`${baseUrl.replace(/\/+$/, "")}/`);
    const location = new URL(rawLocation, targetUrl);

    if (
        location.origin !== originUrl.origin ||
        !location.pathname.startsWith(originUrl.pathname)
    )
        return null;

    const suffix = location.pathname.slice(originUrl.pathname.length);
    const publicUrl = new URL(
        `${API_CONFIG.proxyRoutePrefix}/${suffix}${location.search}${location.hash}`,
        request.url,
    );

    return publicUrl.toString();
}

/** Transporte HTTP de servidor a servidor. Sin reglas de negocio ni validación JWT. */
export async function forwardBackendRequest(
    request: NextRequest,
    path: string[],
): Promise<Response> {
    if (!isSameOriginMutation(request))
        return problem(403, "Forbidden", "CROSS_ORIGIN_REQUEST_BLOCKED");

    let upstreamUrl: URL;
    let baseUrl: string;

    try {
        baseUrl = getBackendApiUrl();
        upstreamUrl = buildTargetUrl(baseUrl, path, request);
    } catch (error) {
        if (error instanceof InvalidBackendPath)
            return problem(400, "Bad Request", "INVALID_BACKEND_PATH");

        console.error("[backend-bff] Configuración inválida del backend");

        return problem(503, "Service Unavailable", "BACKEND_NOT_CONFIGURED");
    }

    const timeout = AbortSignal.timeout(API_CONFIG.requestTimeoutMs);
    const signal = AbortSignal.any([request.signal, timeout]);

    try {
        const method = request.method.toUpperCase();
        const body = SAFE_METHODS.has(method) ? undefined : request.body;
        const upstream = await fetch(upstreamUrl, {
            method,
            headers: buildRequestHeaders(request),
            body,
            // Necesario para enviar ReadableStream con fetch en Node.js.
            ...(body ? { duplex: "half" as const } : {}),
            cache: "no-store",
            redirect: "manual",
            signal,
        } as RequestInit & { duplex?: "half" });

        const headers = buildResponseHeaders(upstream, request);
        const rawLocation = upstream.headers.get("location");

        if (rawLocation && upstream.status >= 300 && upstream.status < 400) {
            const location = rewriteLocation(
                rawLocation,
                upstreamUrl,
                baseUrl,
                request,
            );

            if (!location) {
                await upstream.body?.cancel();

                return problem(
                    502,
                    "Bad Gateway",
                    "UNSUPPORTED_BACKEND_REDIRECT",
                );
            }

            headers.set("Location", location);
        }

        const responseBody =
            method === "HEAD" || NO_BODY_STATUSES.has(upstream.status)
                ? null
                : upstream.body;

        return new Response(responseBody, {
            status: upstream.status,
            statusText: upstream.statusText,
            headers,
        });
    } catch {
        if (timeout.aborted)
            return problem(504, "Gateway Timeout", "BACKEND_TIMEOUT");

        return problem(502, "Bad Gateway", "BACKEND_UNAVAILABLE");
    }
}
