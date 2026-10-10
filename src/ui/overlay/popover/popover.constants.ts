// src/ui/overlay/popover/popover.constants.ts

import type { PopoverContentProps } from "./popover.types";

export const POPOVER_CONTENT_DEFAULTS = {
  align: "center",
  sideOffset: 4,
} as const satisfies Pick<PopoverContentProps, "align" | "sideOffset">;
