// src/ui/overlay/tooltip/tooltip.types.ts

import type { Tooltip as TooltipPrimitive } from "radix-ui";
import type { ComponentProps } from "react";

export interface TooltipProviderProps extends ComponentProps<typeof TooltipPrimitive.Provider> {}

export interface TooltipProps extends ComponentProps<typeof TooltipPrimitive.Root> {}

export interface TooltipTriggerProps extends ComponentProps<typeof TooltipPrimitive.Trigger> {}

export interface TooltipContentProps extends ComponentProps<typeof TooltipPrimitive.Content> {}
