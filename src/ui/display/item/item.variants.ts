// src/ui/display/item/item.variants.ts

import { cva, type VariantProps } from "class-variance-authority";

export const itemVariants = cva(
  [
    "group/item flex w-full flex-wrap items-center rounded-lg border text-sm",
    "transition-colors duration-100 outline-none",
    "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
    "[a]:transition-colors [a]:hover:bg-muted",
  ].join(" "),
  {
    variants: {
      variant: {
        ghost: "border-transparent",
        outline: "border-border",
        muted: "border-transparent bg-muted/50",
      },
      size: {
        xs: "gap-2 px-2.5 py-2 in-data-[slot=dropdown-menu-content]:p-0",
        sm: "gap-2.5 px-3 py-2.5",
        md: "gap-2.5 px-3 py-2.5",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "md",
    },
  },
);

export const itemMediaVariants = cva(
  [
    "flex shrink-0 items-center justify-center gap-2",
    "group-has-data-[slot=item-description]/item:translate-y-0.5",
    "group-has-data-[slot=item-description]/item:self-start",
    "[&_svg]:pointer-events-none",
  ].join(" "),
  {
    variants: {
      variant: {
        plain: "bg-transparent",
        icon: "[&_svg:not([class*='size-'])]:size-4",
        image: [
          "size-10 overflow-hidden rounded-sm",
          "group-data-[size=sm]/item:size-8",
          "group-data-[size=xs]/item:size-6",
          "[&_img]:size-full [&_img]:object-cover",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "plain",
    },
  },
);

export type ItemVariants = VariantProps<typeof itemVariants>;

export type ItemMediaVariants = VariantProps<typeof itemMediaVariants>;
