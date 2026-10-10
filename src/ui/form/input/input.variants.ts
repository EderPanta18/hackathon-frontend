// src/ui/form/input/input.variants.ts

import { cva, type VariantProps } from "class-variance-authority";

export const inputVariants = cva(
  [
    "w-full min-w-0 outline-none transition-colors duration-200",
    "placeholder:text-muted-foreground",
    "file:inline-flex file:h-6 file:border-0 file:bg-transparent",
    "file:text-sm file:font-medium file:text-foreground",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "read-only:cursor-default",
  ].join(" "),
  {
    variants: {
      variant: {
        outline: [
          "rounded-lg border border-input bg-transparent shadow-sm",
          "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
          "disabled:bg-input/50",
          "dark:bg-input/30 dark:disabled:bg-input/80",
          "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
          "dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
          "read-only:border-dashed",
          "read-only:focus-visible:ring-0 read-only:focus-visible:border-input",
        ].join(" "),

        underline: [
          "rounded-none border-0 border-b border-input bg-transparent px-0 shadow-none",
          "focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-ring",
          "aria-invalid:border-destructive dark:aria-invalid:border-destructive/50",
          "read-only:border-dashed read-only:focus-visible:border-b",
        ].join(" "),
      },

      size: {
        sm: "h-8 text-xs",
        md: "h-9 text-sm",
        lg: "h-10 text-sm",
      },
    },

    compoundVariants: [
      { variant: "outline", size: "sm", class: "px-2" },
      { variant: "outline", size: "md", class: "px-3" },
      { variant: "outline", size: "lg", class: "px-3.5" },
    ],

    defaultVariants: {
      variant: "outline",
      size: "md",
    },
  },
);

export type InputVariants = VariantProps<typeof inputVariants>;
