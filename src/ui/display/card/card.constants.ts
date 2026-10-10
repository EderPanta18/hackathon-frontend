// src/ui/display/card/card.constants.ts

import type { CardProps } from "./card.types";

export const CARD_DEFAULTS = {
  size: "md",
} as const satisfies Required<Pick<CardProps, "size">>;
