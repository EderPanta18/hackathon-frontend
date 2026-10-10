// src/ui/primitives/separator/separator.variants.ts

import { cva, type VariantProps } from "class-variance-authority";

export const separatorVariants = cva("shrink-0 bg-border", {
  variants: {
    orientation: {
      horizontal: "w-full",
      vertical: "self-stretch",
    },
    thickness: {
      thin: "",
      normal: "",
      thick: "",
    },
  },
  compoundVariants: [
    { orientation: "horizontal", thickness: "thin", class: "h-[0.05rem]" },
    { orientation: "horizontal", thickness: "normal", class: "h-[0.1rem]" },
    { orientation: "horizontal", thickness: "thick", class: "h-[0.15rem]" },
    { orientation: "vertical", thickness: "thin", class: "w-[0.05rem]" },
    { orientation: "vertical", thickness: "normal", class: "w-[0.1rem]" },
    { orientation: "vertical", thickness: "thick", class: "w-[0.15rem]" },
  ],
  defaultVariants: {
    orientation: "horizontal",
    thickness: "normal",
  },
});

export type SeparatorVariants = VariantProps<typeof separatorVariants>;
