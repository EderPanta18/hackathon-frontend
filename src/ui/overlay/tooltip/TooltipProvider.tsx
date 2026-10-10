// src/ui/overlay/tooltip/TooltipProvider.tsx

import { Tooltip as TooltipPrimitive } from "radix-ui";
import { TOOLTIP_PROVIDER_DEFAULTS } from "./tooltip.constants";
import type { TooltipProviderProps } from "./tooltip.types";

export const TooltipProvider = ({
  delayDuration = TOOLTIP_PROVIDER_DEFAULTS.delayDuration,
  ...props
}: TooltipProviderProps) => {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
};

export default TooltipProvider;
