export type RouteAccess = "public" | "authenticated";

export type RouteMatch = "exact" | "prefix";

export type AppRouteAccessRule = {
  readonly path: `/${string}`;
  readonly access: RouteAccess;
  readonly match?: RouteMatch;
};

export const APP_ROUTE_ACCESS_RULES: readonly AppRouteAccessRule[] = [
  { path: "/demo", access: "public", match: "prefix" },
  {
    path: "/login",
    access: "public",
    match: "exact",
  },
];

export const ROUTE_ACCESS_CONFIG = {
  defaultAccess: "authenticated",
  signInPath: "/login",
} as const satisfies {
  readonly defaultAccess: RouteAccess;
  readonly signInPath: `/${string}` | null;
};
