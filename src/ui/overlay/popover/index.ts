// src/ui/overlay/popover/index.ts

import {
  PopoverAnchor,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  Popover as PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "./Popover";

export const Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Anchor: PopoverAnchor,
  Content: PopoverContent,
  Header: PopoverHeader,
  Title: PopoverTitle,
  Description: PopoverDescription,
});

export type {
  PopoverAnchorProps,
  PopoverContentProps,
  PopoverDescriptionProps,
  PopoverHeaderProps,
  PopoverProps,
  PopoverTitleProps,
  PopoverTriggerProps,
} from "./popover.types";
