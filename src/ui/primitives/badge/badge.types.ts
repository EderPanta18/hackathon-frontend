// src/ui/primitives/badge/badge.types.ts

import type { ComponentPropsWithoutRef } from "react";

export type BadgeTone = "primary" | "secondary" | "neutral" | "success" | "destructive";

export type BadgeVariant = "solid" | "outline" | "ghost" | "soft";

export type BadgeSize = "xs" | "sm" | "md" | "lg";

type NativeSpanProps = Omit<ComponentPropsWithoutRef<"span">, "color">;

export interface BadgeProps extends NativeSpanProps {
  size?: BadgeSize;
  tone?: BadgeTone;
  variant?: BadgeVariant;
  asChild?: boolean;
}
