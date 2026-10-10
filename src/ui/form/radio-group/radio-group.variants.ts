// src/ui/form/radio-group/radio-group.variants.ts

import { cva, type VariantProps } from "class-variance-authority";

export const radioGroupItemVariants = cva(
  [
    "group/radio-group-item peer relative flex aspect-square shrink-0 rounded-full",
    "border border-input outline-none",
    "after:absolute after:-inset-x-3 after:-inset-y-2",
    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
    "dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
    "dark:bg-input/30",
    "aria-invalid:aria-checked:border-primary",
  ].join(" "),
  {
    variants: {
      size: {
        xs: "size-3",
        md: "size-4",
      },
      tone: {
        primary: [
          "data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground",
          "dark:data-checked:bg-primary",
        ].join(" "),
        secondary: [
          "data-checked:border-secondary data-checked:bg-secondary data-checked:text-secondary-foreground",
          "dark:data-checked:bg-secondary",
        ].join(" "),
        neutral: [
          "data-checked:border-neutral data-checked:bg-neutral data-checked:text-neutral-foreground",
          "dark:data-checked:bg-neutral",
        ].join(" "),
      },
    },
    defaultVariants: {
      size: "md",
      tone: "primary",
    },
  },
);

export type RadioGroupItemVariants = VariantProps<typeof radioGroupItemVariants>;
