// src/ui/navigation/sidebar/menu-sub/menu-sub.types.ts

import type { ComponentProps } from "react";

export type SidebarMenuSubButtonSize = "sm" | "default";

export interface SidebarMenuSubProps extends ComponentProps<"ul"> {}

export interface SidebarMenuSubItemProps extends ComponentProps<"li"> {}

export interface SidebarMenuSubButtonProps extends ComponentProps<"a"> {
  size?: SidebarMenuSubButtonSize;
  isActive?: boolean;
  asChild?: boolean;
}
