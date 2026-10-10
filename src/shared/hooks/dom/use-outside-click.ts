"use client";

import { useEffect, useRef } from "react";

export type UseOutsideClickOptions = {
    enabled?: boolean;
    ignoreRightClick?: boolean;
};

export function useOutsideClick<T extends HTMLElement>(
    handler: (event: PointerEvent) => void,
    { enabled = true, ignoreRightClick = true }: UseOutsideClickOptions = {},
) {
    const ref = useRef<T | null>(null);
    const handlerRef = useRef(handler);

    useEffect(() => {
        handlerRef.current = handler;
    }, [handler]);

    useEffect(() => {
        if (!enabled) return;

        const onPointerDown = (event: PointerEvent) => {
            if (ignoreRightClick && event.button === 2) return;

            const element = ref.current;

            if (!element) return;

            if (event.composedPath().includes(element)) return;

            handlerRef.current(event);
        };

        document.addEventListener("pointerdown", onPointerDown);

        return () => document.removeEventListener("pointerdown", onPointerDown);
    }, [enabled, ignoreRightClick]);

    return ref;
}
