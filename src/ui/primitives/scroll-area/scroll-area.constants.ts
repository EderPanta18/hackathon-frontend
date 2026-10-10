// src/ui/primitives/scroll-area/scroll-area.constants.ts

import type { ScrollBarProps } from "./scroll-area.types";

export const SCROLL_BAR_DEFAULTS = {
  orientation: "vertical",
} as const satisfies Required<Pick<ScrollBarProps, "orientation">>;
