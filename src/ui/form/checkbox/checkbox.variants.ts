// src/ui/form/checkbox/checkbox.variants.ts

import { cva, type VariantProps } from "class-variance-authority";

export const checkboxVariants = cva(
  [
    "peer group/checkbox relative flex shrink-0 items-center justify-center",
    "rounded-[4px] border border-input transition-colors outline-none",
    "after:absolute after:-inset-x-3 after:-inset-y-2",
    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "group-has-disabled/field:opacity-50",
    "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
    "dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
    "aria-invalid:aria-checked:border-primary",
    "dark:bg-input/30",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "size-3",
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

export const checkboxIndicatorClass = [
  "grid place-content-center text-current transition-none",
  // Tamaño del ícono por size
  "group-data-[size=sm]/checkbox:[&>svg]:size-2.5",
  "group-data-[size=md]/checkbox:[&>svg]:size-3.5",
].join(" ");

export type CheckboxVariants = VariantProps<typeof checkboxVariants>;
