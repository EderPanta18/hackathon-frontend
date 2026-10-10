// src/ui/loaders/spinner/spinner.constants.ts

import type { SpinnerProps, SpinnerSize } from "./spinner.types";

export const SPINNER_DEFAULTS = {
  size: "md",
} as const satisfies Required<Pick<SpinnerProps, "size">>;

export const SPINNER_SIZE_STYLES = {
  sm: { indicator: 16, gap: "gap-1.5", label: "text-[11px]", stroke: 2 },
  md: { indicator: 24, gap: "gap-2", label: "text-xs", stroke: 2.5 },
  lg: { indicator: 32, gap: "gap-2.5", label: "text-sm", stroke: 3 },
  xl: { indicator: 40, gap: "gap-3", label: "text-base", stroke: 3 },
  "2xl": { indicator: 56, gap: "gap-3.5", label: "text-lg", stroke: 3.5 },
  "3xl": { indicator: 72, gap: "gap-4", label: "text-xl", stroke: 4 },
  "5xl": { indicator: 96, gap: "gap-5", label: "text-2xl", stroke: 4 },
} as const satisfies Record<
  SpinnerSize,
  { indicator: number; gap: string; label: string; stroke: number }
>;

export const SPINNER_DEFAULT_SR_LABEL = "Cargando";
