// src/ui/overlay/popover/Popover.tsx

import { Popover as PopoverPrimitive } from "radix-ui";
import { cn } from "@/lib/styling";
import { POPOVER_CONTENT_DEFAULTS } from "./popover.constants";
import type {
  PopoverAnchorProps,
  PopoverContentProps,
  PopoverDescriptionProps,
  PopoverHeaderProps,
  PopoverProps,
  PopoverTitleProps,
  PopoverTriggerProps,
} from "./popover.types";

const Popover = ({ ...props }: PopoverProps) => (
  <PopoverPrimitive.Root data-slot="popover" {...props} />
);

const PopoverTrigger = ({ ...props }: PopoverTriggerProps) => (
  <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
);

const PopoverAnchor = ({ ...props }: PopoverAnchorProps) => (
  <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
);

const PopoverContent = ({
  align = POPOVER_CONTENT_DEFAULTS.align,
  sideOffset = POPOVER_CONTENT_DEFAULTS.sideOffset,
  className,
  ...props
}: PopoverContentProps) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      data-slot="popover-content"
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 flex w-72 flex-col gap-2.5 rounded-lg",
        "origin-(--radix-popover-content-transform-origin)",
        "bg-popover p-2.5 text-sm text-popover-foreground",
        "shadow-md ring-1 ring-foreground/10 outline-hidden",
        "duration-100",
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
  </PopoverPrimitive.Portal>
);

const PopoverHeader = ({ className, ...props }: PopoverHeaderProps) => (
  <div
    data-slot="popover-header"
    className={cn("flex flex-col gap-0.5 text-sm", className)}
    {...props}
  />
);

const PopoverTitle = ({ className, ...props }: PopoverTitleProps) => (
  <div data-slot="popover-title" className={cn("font-heading font-medium", className)} {...props} />
);

const PopoverDescription = ({ className, ...props }: PopoverDescriptionProps) => (
  <p
    data-slot="popover-description"
    className={cn("text-muted-foreground", className)}
    {...props}
  />
);

export {
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
};
