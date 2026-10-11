// src/lib/config/routes.config.ts
//
import { ROUTES } from "@/core/constants";
import { Role } from "@/core/enums";

export type RouteAccess = "public" | "authenticated" | "role";

export type RouteMatch = "exact" | "prefix";

export type AppRouteAccessRule = {
    readonly path: `/${string}`;
    readonly access: RouteAccess;
    readonly roles?: readonly Role[];
    readonly match?: RouteMatch;
    /**
     * Solo tiene efecto cuando `access === "public"`.
     * Si hay sesión válida, redirige a `homeByRole[rol]`.
     */
    readonly redirectAuthenticatedToHome?: boolean;
};

export const APP_ROUTE_ACCESS_RULES: readonly AppRouteAccessRule[] = [
    {
        path: ROUTES.public.root,
        access: "public",
        match: "exact",
        redirectAuthenticatedToHome: true,
    },
    {
        path: ROUTES.public.login,
        access: "public",
        match: "exact",
        redirectAuthenticatedToHome: true,
    },
    {
        path: ROUTES.public.demo,
        access: "public",
        match: "prefix",
    },
    {
        path: ROUTES.shared.accessDenied,
        access: "authenticated",
        match: "exact",
    },
    {
        path: ROUTES.comuna.root,
        access: "role",
        roles: [Role.COMUNA],
        match: "prefix",
    },
    {
        path: ROUTES.ong.root,
        access: "role",
        roles: [Role.ONG],
        match: "prefix",
    },
    {
        path: ROUTES.brigada.root,
        access: "role",
        roles: [Role.BRIGADA],
        match: "prefix",
    },
    {
        path: ROUTES.defensaCivil.root,
        access: "role",
        roles: [Role.DEFENSA_CIVIL],
        match: "prefix",
    },
];

export const ROUTE_ACCESS_CONFIG = {
    defaultAccess: "authenticated",
    signInPath: ROUTES.public.login,
    accessDeniedPath: ROUTES.shared.accessDenied,
    homeByRole: {
        [Role.COMUNA]: ROUTES.comuna.root,
        [Role.ONG]: ROUTES.ong.root,
        [Role.BRIGADA]: ROUTES.brigada.root,
        [Role.DEFENSA_CIVIL]: ROUTES.defensaCivil.root,
    },
} as const;
