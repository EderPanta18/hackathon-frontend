// src/ui/overlay/hover-card/hover-card.constants.ts

import type { HoverCardContentProps } from "./hover-card.types";

export const HOVER_CARD_CONTENT_DEFAULTS = {
  align: "center",
  sideOffset: 4,
} as const satisfies Pick<HoverCardContentProps, "align" | "sideOffset">;
