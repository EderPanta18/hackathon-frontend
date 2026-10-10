// src/ui/overlay/tooltip/index.ts

import { TooltipContent, Tooltip as TooltipRoot, TooltipTrigger } from "./Tooltip";

export { TooltipProvider } from "./TooltipProvider";

export const Tooltip = Object.assign(TooltipRoot, {
  Trigger: TooltipTrigger,
  Content: TooltipContent,
});

export type {
  TooltipContentProps,
  TooltipProps,
  TooltipTriggerProps,
} from "./tooltip.types";
