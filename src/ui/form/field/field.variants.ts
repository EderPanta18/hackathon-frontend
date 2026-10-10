// src/ui/form/field/field.variants.ts

import { cva, type VariantProps } from "class-variance-authority";

export const fieldVariants = cva(
  "group/field flex w-full gap-2 data-[invalid=true]:text-destructive",
  {
    variants: {
      orientation: {
        vertical: ["flex-col *:w-full", "[&>.sr-only]:w-auto"].join(" "),

        horizontal: [
          "flex-row items-center",
          "has-[>[data-slot=field-content]]:items-start",
          "*:data-[slot=field-label]:flex-auto",
          "has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
        ].join(" "),

        responsive: [
          // Mobile: vertical
          "flex-col *:w-full",
          "[&>.sr-only]:w-auto",
          // Desktop: horizontal
          "@md/field-group:flex-row @md/field-group:items-center",
          "@md/field-group:*:w-auto",
          "@md/field-group:has-[>[data-slot=field-content]]:items-start",
          "@md/field-group:*:data-[slot=field-label]:flex-auto",
          "@md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
        ].join(" "),
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  },
);

export type FieldVariants = VariantProps<typeof fieldVariants>;
