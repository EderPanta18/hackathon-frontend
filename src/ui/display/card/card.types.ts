// src/ui/display/card/card.types.ts

import type { ComponentProps } from "react";
import type { SeparatorProps } from "@/ui/primitives/separator";

export type CardSize = "sm" | "md";

export interface CardProps extends ComponentProps<"div"> {
  size?: CardSize;
}

export interface CardHeaderProps extends ComponentProps<"div"> {}

export interface CardTitleProps extends ComponentProps<"div"> {}

export interface CardDescriptionProps extends ComponentProps<"div"> {}

export interface CardActionProps extends ComponentProps<"div"> {}

export interface CardContentProps extends ComponentProps<"div"> {}

export interface CardFooterProps extends ComponentProps<"div"> {}

export interface CardSeparatorProps extends SeparatorProps {}
