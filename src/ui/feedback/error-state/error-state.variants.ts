// src/ui/feedback/error-state/error-state.variants.ts

import { cva, type VariantProps } from "class-variance-authority";

export const errorStateVariants = cva(
  [
    "flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4",
    "rounded-xl p-6 text-center text-balance",
  ].join(" "),
  {
    variants: {
      variant: {
        soft: [
          "bg-destructive/5 border border-destructive/20",
          "dark:bg-destructive/10 dark:border-destructive/20",
        ].join(" "),
        ghost: ["border border-dashed border-destructive/40", "dark:border-destructive/30"].join(
          " ",
        ),
      },
    },
    defaultVariants: {
      variant: "soft",
    },
  },
);

export const errorStateMediaVariants = cva(
  [
    "mb-2 flex shrink-0 items-center justify-center",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        plain: "bg-transparent text-destructive",
        icon: [
          "flex size-8 shrink-0 items-center justify-center rounded-lg",
          "bg-destructive/10 text-destructive",
          "dark:bg-destructive/20 dark:text-destructive",
          "[&_svg:not([class*='size-'])]:size-4",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "icon",
    },
  },
);

export type ErrorStateVariants = VariantProps<typeof errorStateVariants>;

export type ErrorStateMediaVariants = VariantProps<typeof errorStateMediaVariants>;
