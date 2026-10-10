// src/ui/primitives/separator/separator.types.ts

import type { Separator as SeparatorPrimitive } from "radix-ui";
import type { ComponentProps } from "react";

export type SeparatorOrientation = "horizontal" | "vertical";

export type SeparatorThickness = "thin" | "normal" | "thick";

export type SeparatorBreakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

export interface SeparatorResponsive {
  orientation: SeparatorOrientation;
  breakpoint: SeparatorBreakpoint;
}

type NativeSeparatorProps = Omit<ComponentProps<typeof SeparatorPrimitive.Root>, "orientation">;

export interface SeparatorProps extends NativeSeparatorProps {
  orientation?: SeparatorOrientation;
  thickness?: SeparatorThickness;
  responsive?: SeparatorResponsive;
}
