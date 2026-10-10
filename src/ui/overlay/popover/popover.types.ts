// src/ui/overlay/popover/popover.types.ts

import type { Popover as PopoverPrimitive } from "radix-ui";
import type { ComponentProps } from "react";

export interface PopoverProps extends ComponentProps<typeof PopoverPrimitive.Root> {}

export interface PopoverTriggerProps extends ComponentProps<typeof PopoverPrimitive.Trigger> {}

export interface PopoverContentProps extends ComponentProps<typeof PopoverPrimitive.Content> {}

export interface PopoverAnchorProps extends ComponentProps<typeof PopoverPrimitive.Anchor> {}

export interface PopoverHeaderProps extends ComponentProps<"div"> {}

export interface PopoverTitleProps extends ComponentProps<"div"> {}

export interface PopoverDescriptionProps extends ComponentProps<"p"> {}
