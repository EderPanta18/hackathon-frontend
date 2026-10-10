"use client";

import { useSyncExternalStore } from "react";

const MOBILE_QUERY = "(max-width: 767px)";

const getServerSnapshot = () => false;

const getSnapshot = () => window.matchMedia(MOBILE_QUERY).matches;

function subscribe(callback: () => void): () => void {
    const mediaQuery = window.matchMedia(MOBILE_QUERY);

    mediaQuery.addEventListener("change", callback);

    return () => mediaQuery.removeEventListener("change", callback);
}

export function useIsMobile(): boolean {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
