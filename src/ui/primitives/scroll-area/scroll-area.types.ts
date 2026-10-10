// src/ui/primitives/scroll-area/scroll-area.types.ts

import type { ScrollArea as ScrollAreaPrimitive } from "radix-ui";
import type { ComponentProps } from "react";

export type ScrollBarOrientation = "vertical" | "horizontal";

export interface ScrollAreaProps extends ComponentProps<typeof ScrollAreaPrimitive.Root> {}

export interface ScrollBarProps
  extends ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> {
  orientation?: ScrollBarOrientation;
}
