import { describe, expect, it, vi } from "vitest";
import {
    APP_ROUTE_ACCESS_RULES,
    ROUTE_ACCESS_CONFIG,
} from "../lib/config/routes.config";

vi.mock("@/lib/config", () => ({
    APP_ROUTE_ACCESS_RULES,
    ROUTE_ACCESS_CONFIG,
}));

describe("acceso público limitado a DEMO", () => {
    it("mantiene las cinco vistas públicas sin abrir prefijos similares ni privadas", async () => {
        const { resolveRouteAccess } = await import("./route-policy");
        for (const path of [
            "/demo",
            "/demo/asignaciones",
            "/demo/despachos",
            "/demo/documentos/manifiesto",
            "/demo/documentos/acta",
            "/demo/",
        ])
            expect(resolveRouteAccess(path)).toBe("public");
        for (const path of [
            "/demo-extra",
            "/demostracion",
            "/dashboard",
            "/",
            "/login/otro",
        ])
            expect(resolveRouteAccess(path)).toBe("authenticated");
        expect(resolveRouteAccess("/login")).toBe("public");
    });
});
