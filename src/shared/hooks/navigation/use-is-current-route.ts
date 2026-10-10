"use client";

import { usePathname } from "next/navigation";
import { normalizeRoutePath } from "@/shared/utils";

export interface UseIsCurrentRouteOptions {
    exact?: boolean;
    includeDescendants?: boolean;
}

export function useIsCurrentRoute(
    targetPath: string,
    { exact = false, includeDescendants = true }: UseIsCurrentRouteOptions = {},
): boolean {
    const pathname = usePathname();
    const current = normalizeRoutePath(pathname);
    const target = normalizeRoutePath(targetPath);

    if (!target) return false;
    if (current === target) return true;
    if (exact || !includeDescendants) return false;
    if (target === "/") return current.startsWith("/");
    return current.startsWith(`${target}/`);
}
