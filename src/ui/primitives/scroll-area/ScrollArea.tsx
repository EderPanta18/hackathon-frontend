// src/ui/primitives/scroll-area/ScrollArea.tsx

import { ScrollArea as ScrollAreaPrimitive } from "radix-ui";
import { cn } from "@/lib/styling";
import { SCROLL_BAR_DEFAULTS } from "./scroll-area.constants";
import type { ScrollAreaProps, ScrollBarProps } from "./scroll-area.types";

const ScrollArea = ({ className, children, ...props }: ScrollAreaProps) => (
  <ScrollAreaPrimitive.Root
    data-slot="scroll-area"
    className={cn("relative", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport
      data-slot="scroll-area-viewport"
      className={cn(
        "size-full rounded-[inherit] outline-none transition-[color,box-shadow]",
        "focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-ring/50",
      )}
    >
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
);

const ScrollBar = ({
  orientation = SCROLL_BAR_DEFAULTS.orientation,
  className,
  ...props
}: ScrollBarProps) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    data-slot="scroll-area-scrollbar"
    data-orientation={orientation}
    orientation={orientation}
    className={cn(
      "flex touch-none p-px transition-colors select-none",
      "data-horizontal:h-2.5 data-horizontal:flex-col",
      "data-horizontal:border-t data-horizontal:border-t-transparent",
      "data-vertical:h-full data-vertical:w-2.5",
      "data-vertical:border-l data-vertical:border-l-transparent",
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb
      data-slot="scroll-area-thumb"
      className="relative flex-1 rounded-full bg-border"
    />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
);

export { ScrollArea, ScrollBar };
