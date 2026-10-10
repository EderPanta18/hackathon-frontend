// src/ui/primitives/badge/badge.constants.ts

import type { BadgeProps } from "./badge.types";

export const BADGE_DEFAULTS = {
  size: "md",
  tone: "neutral",
  variant: "soft",
} as const satisfies Required<Pick<BadgeProps, "size" | "tone" | "variant">>;
