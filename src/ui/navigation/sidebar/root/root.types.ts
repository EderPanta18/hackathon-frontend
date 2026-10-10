// src/ui/navigation/sidebar/root/root.types.ts

import type { ComponentProps } from "react";
import type { InputProps } from "@/ui/form/input";
import type { ButtonProps } from "@/ui/primitives/button";
import type { SeparatorProps } from "@/ui/primitives/separator";

export type SidebarSide = "left" | "right";

export type SidebarVariant = "sidebar" | "floating" | "inset";

export type SidebarCollapsible = "offcanvas" | "icon" | "none";

export interface SidebarProps extends ComponentProps<"div"> {
  side?: SidebarSide;
  variant?: SidebarVariant;
  collapsible?: SidebarCollapsible;
  dir?: string;
}

export interface SidebarContentProps extends ComponentProps<"div"> {}

export interface SidebarHeaderProps extends ComponentProps<"div"> {}

export interface SidebarFooterProps extends ComponentProps<"div"> {}

export interface SidebarInsetProps extends ComponentProps<"main"> {}

export interface SidebarInputProps extends InputProps {}

export interface SidebarSeparatorProps extends SeparatorProps {}

export interface SidebarTriggerProps extends ButtonProps {}

export interface SidebarRailProps extends ComponentProps<"button"> {}
