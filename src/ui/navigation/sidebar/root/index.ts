// src/ui/navigation/sidebar/root/index.ts

import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarRail,
  Sidebar as SidebarRoot,
  SidebarSeparator,
  SidebarTrigger,
} from "./Root";

export const Sidebar = Object.assign(SidebarRoot, {
  Content: SidebarContent,
  Header: SidebarHeader,
  Footer: SidebarFooter,
  Separator: SidebarSeparator,
  Inset: SidebarInset,
  Input: SidebarInput,
  Trigger: SidebarTrigger,
  Rail: SidebarRail,
});

export type {
  SidebarContentProps,
  SidebarFooterProps,
  SidebarHeaderProps,
  SidebarInputProps,
  SidebarInsetProps,
  SidebarProps,
  SidebarRailProps,
  SidebarSeparatorProps,
  SidebarTriggerProps,
} from "./root.types";
