// src/ui/feedback/empty-state/empty-state.variants.ts

import { cva, type VariantProps } from "class-variance-authority";

export const emptyStateMediaVariants = cva(
  [
    "mb-2 flex shrink-0 items-center justify-center",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        plain: "bg-transparent",
        icon: [
          "flex size-8 shrink-0 items-center justify-center",
          "rounded-lg bg-muted text-foreground",
          "[&_svg:not([class*='size-'])]:size-4",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "icon",
    },
  },
);

export type EmptyStateMediaVariants = VariantProps<typeof emptyStateMediaVariants>;
