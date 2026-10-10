// src/ui/primitives/separator/separator.constants.ts

import type { SeparatorBreakpoint, SeparatorProps } from "./separator.types";

export const SEPARATOR_DEFAULTS = {
  orientation: "horizontal",
  thickness: "normal",
  decorative: true,
} as const satisfies Required<Pick<SeparatorProps, "orientation" | "thickness" | "decorative">>;

export const SEPARATOR_HIDE_AT = {
  sm: "sm:hidden",
  md: "md:hidden",
  lg: "lg:hidden",
  xl: "xl:hidden",
  "2xl": "2xl:hidden",
} as const satisfies Record<SeparatorBreakpoint, string>;

export const SEPARATOR_SHOW_AT = {
  sm: "sm:block",
  md: "md:block",
  lg: "lg:block",
  xl: "xl:block",
  "2xl": "2xl:block",
} as const satisfies Record<SeparatorBreakpoint, string>;
