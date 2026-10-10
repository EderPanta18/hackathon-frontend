// src/ui/form/select/select.variants.ts

import { cva, type VariantProps } from "class-variance-authority";

export const selectTriggerVariants = cva(
  [
    "flex w-fit items-center justify-between gap-1.5 whitespace-nowrap select-none",
    "rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm",
    "transition-colors outline-none",
    // Focus
    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
    // Disabled
    "disabled:cursor-not-allowed disabled:opacity-50",
    // Placeholder
    "data-placeholder:text-muted-foreground",
    // aria-invalid
    "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
    // Dark
    "dark:bg-input/30 dark:hover:bg-input/50",
    "dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
    // SVG inside
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    // SelectValue slot
    "*:data-[slot=select-value]:line-clamp-1",
    "*:data-[slot=select-value]:flex",
    "*:data-[slot=select-value]:items-center",
    "*:data-[slot=select-value]:gap-1.5",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-7 rounded-[min(var(--radius-md),10px)]",
        md: "h-8",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const selectContentVariants = cva(
  [
    "relative z-50 min-w-36 overflow-x-hidden overflow-y-auto",
    "max-h-(--radix-select-content-available-height)",
    "origin-(--radix-select-content-transform-origin)",
    "rounded-lg bg-popover text-popover-foreground shadow-md",
    "ring-1 ring-foreground/10",
    // Animations
    "duration-100",
    "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
    "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
    "data-[side=bottom]:slide-in-from-top-2",
    "data-[side=left]:slide-in-from-right-2",
    "data-[side=right]:slide-in-from-left-2",
    "data-[side=top]:slide-in-from-bottom-2",
    // item-aligned no anima
    "data-[align-trigger=true]:animate-none",
  ].join(" "),
  {
    variants: {
      position: {
        "item-aligned": "",
        popper: [
          "data-[side=bottom]:translate-y-1",
          "data-[side=left]:-translate-x-1",
          "data-[side=right]:translate-x-1",
          "data-[side=top]:-translate-y-1",
        ].join(" "),
      },
    },
    defaultVariants: {
      position: "item-aligned",
    },
  },
);

export type SelectTriggerVariants = VariantProps<typeof selectTriggerVariants>;

export type SelectContentVariants = VariantProps<typeof selectContentVariants>;
