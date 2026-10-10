// src/ui/composition/query-controls/search-input/search-input.variants.ts

import { cva } from "class-variance-authority";

export const searchInputPaddingVariants = cva("", {
  variants: {
    size: { sm: "", md: "", lg: "" },
    hasLeft: { true: "", false: "" },
    hasRight: { true: "", false: "" },
  },
  compoundVariants: [
    { hasLeft: true, size: "sm", class: "pl-7" },
    { hasLeft: true, size: "md", class: "pl-8" },
    { hasLeft: true, size: "lg", class: "pl-9" },
    { hasRight: true, size: "sm", class: "pr-7" },
    { hasRight: true, size: "md", class: "pr-8" },
    { hasRight: true, size: "lg", class: "pr-9" },
  ],
  defaultVariants: { size: "md", hasLeft: false, hasRight: false },
});

export const searchIconVariants = cva("text-muted-foreground", {
  variants: {
    size: {
      sm: "size-3.5",
      md: "size-4",
      lg: "size-[1.125rem]",
    },
  },
  defaultVariants: { size: "md" },
});
