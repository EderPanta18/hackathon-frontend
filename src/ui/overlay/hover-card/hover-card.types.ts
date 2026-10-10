// src/ui/overlay/hover-card/hover-card.types.ts

import type { HoverCard as HoverCardPrimitive } from "radix-ui";
import type { ComponentProps } from "react";

export interface HoverCardProps extends ComponentProps<typeof HoverCardPrimitive.Root> {}

export interface HoverCardTriggerProps extends ComponentProps<typeof HoverCardPrimitive.Trigger> {}

export interface HoverCardContentProps extends ComponentProps<typeof HoverCardPrimitive.Content> {}
