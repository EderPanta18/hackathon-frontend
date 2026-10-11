// src/middleware/access-policy.ts
import type { AppRouteAccessRule, RouteAccess } from "@/lib/config";
import type { Role } from "@/core/enums/user.enums";
import type { SessionState } from "@/lib/server";

export type AccessDecision =
    { kind: "allow" } | { kind: "redirect"; to: string };

export type AccessPolicyConfig = {
    signInPath: string;
    accessDeniedPath: string;
    defaultAccess: RouteAccess;
    homeByRole: Record<Role, string>;
};

export function evaluateAccess(
    rule: AppRouteAccessRule | null,
    session: SessionState,
    config: AccessPolicyConfig,
): AccessDecision {
    if (!rule) return evaluateUnclassified(session, config);

    if (rule.access === "public") {
        if (
            rule.redirectAuthenticatedToHome &&
            session.status === "authenticated"
        )
            return {
                kind: "redirect",
                to: config.homeByRole[session.session.role],
            };

        return { kind: "allow" };
    }

    if (session.status !== "authenticated")
        return { kind: "redirect", to: config.signInPath };

    if (rule.access === "authenticated") return { kind: "allow" };

    // rule.access === "role"
    if (!rule.roles || rule.roles.length === 0)
        // Regla mal configurada: fallar cerrado.
        return { kind: "redirect", to: config.accessDeniedPath };

    if (rule.roles.includes(session.session.role)) return { kind: "allow" };

    return { kind: "redirect", to: config.accessDeniedPath };
}

function evaluateUnclassified(
    session: SessionState,
    config: AccessPolicyConfig,
): AccessDecision {
    if (config.defaultAccess === "public") return { kind: "allow" };

    // defaultAccess === "authenticated" (o "role" degradado a authenticated).
    if (session.status === "authenticated") return { kind: "allow" };

    return { kind: "redirect", to: config.signInPath };
}
