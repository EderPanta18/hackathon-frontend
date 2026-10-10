// src/ui/overlay/hover-card/HoverCard.tsx

import { HoverCard as HoverCardPrimitive } from "radix-ui";
import { cn } from "@/lib/styling";
import { HOVER_CARD_CONTENT_DEFAULTS } from "./hover-card.constants";
import type {
  HoverCardContentProps,
  HoverCardProps,
  HoverCardTriggerProps,
} from "./hover-card.types";

const HoverCard = ({ ...props }: HoverCardProps) => (
  <HoverCardPrimitive.Root data-slot="hover-card" {...props} />
);

const HoverCardTrigger = ({ ...props }: HoverCardTriggerProps) => (
  <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
);

const HoverCardContent = ({
  align = HOVER_CARD_CONTENT_DEFAULTS.align,
  sideOffset = HOVER_CARD_CONTENT_DEFAULTS.sideOffset,
  className,
  ...props
}: HoverCardContentProps) => (
  <HoverCardPrimitive.Portal data-slot="hover-card-portal">
    <HoverCardPrimitive.Content
      data-slot="hover-card-content"
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-64 rounded-lg",
        "origin-(--radix-hover-card-content-transform-origin)",
        "bg-popover p-2.5 text-sm text-popover-foreground",
        "shadow-md ring-1 ring-foreground/10 outline-hidden duration-100",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        "data-[side=top]:slide-in-from-bottom-2",
        "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
        "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
        className,
      )}
      {...props}
    />
  </HoverCardPrimitive.Portal>
);

export { HoverCard, HoverCardTrigger, HoverCardContent };
