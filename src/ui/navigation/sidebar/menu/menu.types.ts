// src/ui/navigation/sidebar/menu/menu.types.ts

import type { ComponentProps } from "react";
import type { TooltipContentProps } from "@/ui/overlay/tooltip";

export type SidebarMenuButtonSize = "sm" | "md" | "lg";

export type SidebarMenuButtonVariant = "ghost" | "outline";

export interface SidebarMenuProps extends ComponentProps<"ul"> {}

export interface SidebarMenuItemProps extends ComponentProps<"li"> {}

export interface SidebarMenuButtonProps extends ComponentProps<"button"> {
  size?: SidebarMenuButtonSize;
  variant?: SidebarMenuButtonVariant;
  isActive?: boolean;
  tooltip?: string | TooltipContentProps;
  asChild?: boolean;
}

export interface SidebarMenuActionProps extends ComponentProps<"button"> {
  asChild?: boolean;
  showOnHover?: boolean;
}

export interface SidebarMenuBadgeProps extends ComponentProps<"div"> {}

export interface SidebarMenuSkeletonProps extends ComponentProps<"div"> {
  showIcon?: boolean;
}
