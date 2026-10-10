// src/ui/overlay/tooltip/Tooltip.tsx

"use client";

import { Tooltip as TooltipPrimitive } from "radix-ui";
import { cn } from "@/lib/styling";
import { TOOLTIP_CONTENT_DEFAULTS } from "./tooltip.constants";
import type { TooltipContentProps, TooltipProps, TooltipTriggerProps } from "./tooltip.types";

const Tooltip = ({ ...props }: TooltipProps) => (
  <TooltipPrimitive.Root data-slot="tooltip" {...props} />
);

const TooltipTrigger = ({ ...props }: TooltipTriggerProps) => (
  <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
);

const TooltipContent = ({
  sideOffset = TOOLTIP_CONTENT_DEFAULTS.sideOffset,
  className,
  children,
  ...props
}: TooltipContentProps) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      data-slot="tooltip-content"
      sideOffset={sideOffset}
      className={cn(
        "z-50 inline-flex w-fit max-w-xs items-center gap-1.5 rounded-md",
        "origin-(--radix-tooltip-content-transform-origin)",
        "bg-tooltip px-3 py-1.5 text-xs text-tooltip-foreground",
        "has-data-[slot=kbd]:pr-1.5",
        "**:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate",
        "**:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        "data-[side=top]:slide-in-from-bottom-2",
        "data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95",
        "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
        "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
        className,
      )}
      {...props}
    >
      {children}
      <TooltipPrimitive.Arrow className="z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-xs bg-tooltip fill-tooltip" />
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
);

export { Tooltip, TooltipTrigger, TooltipContent };
