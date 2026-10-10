// src/ui/navigation/sidebar/menu-sub/index.ts

import {
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarMenuSub as SidebarMenuSubRoot,
} from "./MenuSub";

export const SidebarMenuSub = Object.assign(SidebarMenuSubRoot, {
  Item: SidebarMenuSubItem,
  Button: SidebarMenuSubButton,
});

export type {
  SidebarMenuSubButtonProps,
  SidebarMenuSubItemProps,
  SidebarMenuSubProps,
} from "./menu-sub.types";
