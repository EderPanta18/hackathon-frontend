// src/ui/primitives/image/image.variants.ts

import { cva, type VariantProps } from "class-variance-authority";

export const imageWrapperVariants = cva("relative overflow-hidden", {
  variants: {
    rounded: {
      none: "",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    rounded: "none",
  },
});

export const imageInnerVariants = cva("block select-none transition-opacity duration-200", {
  variants: {
    fit: {
      cover: "object-cover",
      contain: "object-contain",
      fill: "object-fill",
      none: "object-none",
      "scale-down": "object-scale-down",
    },
  },
  defaultVariants: {
    fit: "cover",
  },
});

export const imageSkeletonVariants = cva("absolute inset-0 size-full bg-muted", {
  variants: {
    skeleton: {
      pulse: "animate-pulse",
      wave: "animate-[skeleton-wave_1.5s_ease_infinite] overflow-hidden",
    },
  },
  defaultVariants: {
    skeleton: "pulse",
  },
});

export type ImageWrapperVariants = VariantProps<typeof imageWrapperVariants>;

export type ImageInnerVariants = VariantProps<typeof imageInnerVariants>;

export type ImageSkeletonVariants = VariantProps<typeof imageSkeletonVariants>;
