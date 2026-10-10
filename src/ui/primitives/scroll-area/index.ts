// src/ui/primitives/scroll-area/index.ts

import { ScrollArea as ScrollAreaRoot, ScrollBar } from "./ScrollArea";

export const ScrollArea = Object.assign(ScrollAreaRoot, {
  Bar: ScrollBar,
});

export type { ScrollAreaProps, ScrollBarProps } from "./scroll-area.types";
