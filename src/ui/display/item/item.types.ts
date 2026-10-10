// src/ui/display/item/item.types.ts

import type { ComponentProps } from "react";
import type { SeparatorProps } from "@/ui/primitives/separator";

export type ItemSize = "xs" | "sm" | "md";

export type ItemVariant = "ghost" | "outline" | "muted";

export type ItemMediaVariant = "plain" | "icon" | "image";

export interface ItemGroupProps extends ComponentProps<"div"> {}

export interface ItemSeparatorProps extends SeparatorProps {}

export interface ItemProps extends ComponentProps<"div"> {
  size?: ItemSize;
  variant?: ItemVariant;
  asChild?: boolean;
}

export interface ItemMediaProps extends ComponentProps<"div"> {
  variant?: ItemMediaVariant;
}

export interface ItemContentProps extends ComponentProps<"div"> {}

export interface ItemTitleProps extends ComponentProps<"div"> {}

export interface ItemDescriptionProps extends ComponentProps<"p"> {}

export interface ItemActionsProps extends ComponentProps<"div"> {}

export interface ItemHeaderProps extends ComponentProps<"div"> {}

export interface ItemFooterProps extends ComponentProps<"div"> {}
