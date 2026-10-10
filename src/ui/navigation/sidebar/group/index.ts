// src/ui/navigation/sidebar/group/index.ts

import {
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarGroup as SidebarGroupRoot,
} from "./Group";

export const SidebarGroup = Object.assign(SidebarGroupRoot, {
  Label: SidebarGroupLabel,
  Action: SidebarGroupAction,
  Content: SidebarGroupContent,
});

export type {
  SidebarGroupActionProps,
  SidebarGroupContentProps,
  SidebarGroupLabelProps,
  SidebarGroupProps,
} from "./group.types";
