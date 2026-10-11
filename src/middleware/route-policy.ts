// src/middleware/route-policy.ts

import {
    APP_ROUTE_ACCESS_RULES,
    ROUTE_ACCESS_CONFIG,
    type AppRouteAccessRule,
    type RouteAccess,
} from "@/lib/config";

function normalizePath(value: string): string {
    return value === "/" ? "/" : value.replace(/\/+$/, "");
}

function matchesRoute(pathname: string, rule: AppRouteAccessRule): boolean {
    const rulePath = normalizePath(rule.path);

    if (rule.match !== "prefix") return pathname === rulePath;

    if (rulePath === "/") return true;

    return pathname === rulePath || pathname.startsWith(`${rulePath}/`);
}

/** Regla más específica; a igualdad de longitud, prevalece la exacta. */
export function resolveRouteRule(pathname: string): AppRouteAccessRule | null {
    const path = normalizePath(pathname);

    let best: AppRouteAccessRule | undefined;

    for (const rule of APP_ROUTE_ACCESS_RULES) {
        if (!matchesRoute(path, rule)) continue;

        const length = normalizePath(rule.path).length;
        const bestLength = best ? normalizePath(best.path).length : -1;

        if (
            !best ||
            length > bestLength ||
            (length === bestLength &&
                rule.match !== "prefix" &&
                best.match === "prefix")
        )
            best = rule;
    }

    return best ?? null;
}

/** Compatibilidad con consumidores existentes que solo necesitan el tipo de acceso. */
export function resolveRouteAccess(pathname: string): RouteAccess {
    return (
        resolveRouteRule(pathname)?.access ?? ROUTE_ACCESS_CONFIG.defaultAccess
    );
}
