// src/ui/navigation/sidebar/group/group.types.ts

import type { ComponentProps } from "react";

export interface SidebarGroupProps extends ComponentProps<"div"> {}

export interface SidebarGroupLabelProps extends ComponentProps<"div"> {
  asChild?: boolean;
}

export interface SidebarGroupActionProps extends ComponentProps<"button"> {
  asChild?: boolean;
}

export interface SidebarGroupContentProps extends ComponentProps<"div"> {}
