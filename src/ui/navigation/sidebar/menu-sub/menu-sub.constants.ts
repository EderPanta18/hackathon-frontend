// src/ui/navigation/sidebar/menu-sub/menu-sub.constants.ts

import type { SidebarMenuSubButtonProps } from "./menu-sub.types";

export const SIDEBAR_MENU_SUB_BUTTON_DEFAULTS = {
  size: "default",
  isActive: false,
} as const satisfies Required<Pick<SidebarMenuSubButtonProps, "size" | "isActive">>;
