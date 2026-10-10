// src/ui/overlay/context-menu/context-menu.variants.ts

import { cva, type VariantProps } from "class-variance-authority";

export const contextMenuItemVariants = cva(
  [
    "group/context-menu-item relative flex cursor-default items-center gap-1.5",
    "rounded-md px-1.5 py-1 text-sm outline-hidden select-none",
    "data-inset:pl-7",
    "data-disabled:pointer-events-none data-disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "[&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        neutral: [
          "focus:bg-accent focus:text-accent-foreground",
          "focus:*:[svg]:text-accent-foreground",
        ].join(" "),
        destructive: [
          "text-destructive *:[svg]:text-destructive",
          "focus:bg-destructive/10 focus:text-destructive",
          "dark:focus:bg-destructive/20",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

export type ContextMenuItemVariants = VariantProps<typeof contextMenuItemVariants>;
