// src/ui/overlay/tooltip/tooltip.constants.ts

import type { TooltipContentProps, TooltipProviderProps } from "./tooltip.types";

export const TOOLTIP_PROVIDER_DEFAULTS = {
  delayDuration: 0,
} as const satisfies Required<Pick<TooltipProviderProps, "delayDuration">>;

export const TOOLTIP_CONTENT_DEFAULTS = {
  sideOffset: 0,
} as const satisfies Required<Pick<TooltipContentProps, "sideOffset">>;
