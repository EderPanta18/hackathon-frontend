// src/ui/composition/query-controls/filter/filter.variants.ts

import { cva } from "class-variance-authority";

export const filterOptionVariants = cva(
  [
    "flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-1.5 py-1.5",
    "text-sm text-foreground select-none transition-colors duration-100",
  ].join(" "),
  {
    variants: {
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "hover:bg-muted/60",
      },
    },
    defaultVariants: { disabled: false },
  },
);
