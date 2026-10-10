// src/ui/navigation/sidebar/root/root.constants.ts

import type { SidebarProps } from "./root.types";

export const SIDEBAR_DEFAULTS = {
  side: "left",
  variant: "sidebar",
  collapsible: "offcanvas",
} as const satisfies Required<Pick<SidebarProps, "side" | "variant" | "collapsible">>;
