// src/ui/overlay/hover-card/index.ts

import { HoverCardContent, HoverCard as HoverCardRoot, HoverCardTrigger } from "./HoverCard";

export const HoverCard = Object.assign(HoverCardRoot, {
  Trigger: HoverCardTrigger,
  Content: HoverCardContent,
});

export type {
  HoverCardContentProps,
  HoverCardProps,
  HoverCardTriggerProps,
} from "./hover-card.types";
