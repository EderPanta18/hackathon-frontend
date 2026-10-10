// src/ui/form/textarea/textarea.variants.ts

import { cva, type VariantProps } from "class-variance-authority";

export const textareaVariants = cva(
  [
    "w-full min-w-0 outline-none transition-colors duration-200",
    "field-sizing-content min-h-20",
    "placeholder:text-muted-foreground",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "read-only:cursor-default",
  ].join(" "),
  {
    variants: {
      variant: {
        outline: [
          "rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-sm resize-y",
          "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
          "disabled:bg-input/50 disabled:resize-none",
          "dark:bg-input/30 dark:disabled:bg-input/80",
          "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
          "dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
          "read-only:border-dashed resize-none",
          "read-only:focus-visible:ring-0 read-only:focus-visible:border-input",
        ].join(" "),

        underline: [
          "rounded-none border-0 border-b border-input bg-transparent px-0 py-2 text-sm shadow-none resize-none",
          "focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-ring",
          "aria-invalid:border-destructive dark:aria-invalid:border-destructive/50",
          "read-only:border-dashed read-only:focus-visible:border-b",
        ].join(" "),
      },
    },

    defaultVariants: {
      variant: "outline",
    },
  },
);

export type TextareaVariants = VariantProps<typeof textareaVariants>;
