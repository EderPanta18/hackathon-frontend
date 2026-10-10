// src/ui/navigation/sidebar/menu/index.ts

import {
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenu as SidebarMenuRoot,
  SidebarMenuSkeleton,
} from "./Menu";

export const SidebarMenu = Object.assign(SidebarMenuRoot, {
  Item: SidebarMenuItem,
  Button: SidebarMenuButton,
  Action: SidebarMenuAction,
  Badge: SidebarMenuBadge,
  Skeleton: SidebarMenuSkeleton,
});

export type {
  SidebarMenuActionProps,
  SidebarMenuBadgeProps,
  SidebarMenuButtonProps,
  SidebarMenuItemProps,
  SidebarMenuProps,
  SidebarMenuSkeletonProps,
} from "./menu.types";
