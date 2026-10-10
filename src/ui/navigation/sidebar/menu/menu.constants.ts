// src/ui/navigation/sidebar/menu/menu.constants.ts

import type {
  SidebarMenuActionProps,
  SidebarMenuButtonProps,
  SidebarMenuSkeletonProps,
} from "./menu.types";

export const SIDEBAR_MENU_BUTTON_DEFAULTS = {
  size: "md",
  variant: "ghost",
  isActive: false,
} as const satisfies Required<Pick<SidebarMenuButtonProps, "size" | "variant" | "isActive">>;

export const SIDEBAR_MENU_ACTION_DEFAULTS = {
  showOnHover: false,
} as const satisfies Required<Pick<SidebarMenuActionProps, "showOnHover">>;

export const SIDEBAR_MENU_SKELETON_DEFAULTS = {
  showIcon: false,
} as const satisfies Required<Pick<SidebarMenuSkeletonProps, "showIcon">>;

export const SIDEBAR_MENU_SKELETON_WIDTH_MIN = 50 as const;
export const SIDEBAR_MENU_SKELETON_WIDTH_RANGE = 40 as const;
