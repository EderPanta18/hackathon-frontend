// src/ui/navigation/sidebar/SidebarProvider.tsx

"use client";

import {
    type CSSProperties,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useIsMobile } from "@/hooks/media";
import { setClientCookie } from "@/lib/cookies.client";
import { cn } from "@/lib/styling";
import {
    SIDEBAR_COOKIE_MAX_AGE,
    SIDEBAR_COOKIE_NAME,
    SIDEBAR_KEYBOARD_SHORTCUT,
    SIDEBAR_PROVIDER_DEFAULTS,
    SIDEBAR_WIDTH,
    SIDEBAR_WIDTH_ICON,
} from "./sidebar.constants";
import { SidebarContext } from "./sidebar.context";
import type { SidebarProviderProps, SidebarState } from "./sidebar.types";

export const SidebarProvider = ({
    defaultOpen = SIDEBAR_PROVIDER_DEFAULTS.defaultOpen,
    open: openProp,
    onOpenChange: setOpenProp,
    className,
    style,
    children,
    ...props
}: SidebarProviderProps) => {
    const isMobile = useIsMobile();

    const [openMobile, setOpenMobile] = useState<boolean>(false);
    const [_open, _setOpen] = useState<boolean>(defaultOpen);

    const open = openProp ?? _open;

    const setOpen = useCallback(
        (value: boolean | ((value: boolean) => boolean)) => {
            if (setOpenProp) {
                setOpenProp(typeof value === "function" ? value(open) : value);
                return;
            }

            _setOpen((prev) => {
                const nextOpen =
                    typeof value === "function" ? value(prev) : value;

                setClientCookie(SIDEBAR_COOKIE_NAME, String(nextOpen), {
                    maxAge: SIDEBAR_COOKIE_MAX_AGE,
                });

                return nextOpen;
            });
        },
        [setOpenProp, open],
    );

    const toggleSidebar = useCallback(
        () =>
            isMobile
                ? setOpenMobile((prev) => !prev)
                : setOpen((prev) => !prev),
        [isMobile, setOpen],
    );

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (
                event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
                (event.metaKey || event.ctrlKey)
            ) {
                event.preventDefault();
                toggleSidebar();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);

    const state: SidebarState = open ? "expanded" : "collapsed";

    const contextValue = useMemo(
        () => ({
            state,
            open,
            setOpen,
            isMobile,
            openMobile,
            setOpenMobile,
            toggleSidebar,
        }),
        [state, open, setOpen, isMobile, openMobile, toggleSidebar],
    );

    return (
        <SidebarContext.Provider value={contextValue}>
            <div
                data-slot="sidebar-wrapper"
                style={
                    {
                        "--sidebar-width": SIDEBAR_WIDTH,
                        "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                        ...style,
                    } as CSSProperties
                }
                className={cn(
                    "group/sidebar-wrapper flex h-dvh w-full",
                    "has-data-[variant=inset]:bg-sidebar",
                    className,
                )}
                {...props}
            >
                {children}
            </div>
        </SidebarContext.Provider>
    );
};

export default SidebarProvider;
