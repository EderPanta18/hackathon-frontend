// src/ui/overlay/dropdown-menu/dropdown-menu.variants.ts

import { cva, type VariantProps } from "class-variance-authority";

export const dropdownMenuItemVariants = cva(
  [
    "group/dropdown-menu-item relative flex cursor-default items-center gap-1.5",
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
          "not-data-[variant=destructive]:focus:**:text-accent-foreground",
        ].join(" "),
        destructive: [
          "text-destructive",
          "focus:bg-destructive/10 focus:text-destructive",
          "dark:focus:bg-destructive/20",
          "*:[svg]:text-destructive",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

export type DropdownMenuItemVariants = VariantProps<typeof dropdownMenuItemVariants>;
