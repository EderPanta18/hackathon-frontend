// src/ui/loaders/skeleton/skeleton.variants.ts

import { cva, type VariantProps } from "class-variance-authority";

export const skeletonVariants = cva("w-full rounded-md bg-muted", {
  variants: {
    size: {
      sm: "h-3",
      md: "h-4",
      lg: "h-5",
      xl: "h-6",
    },
    animation: {
      pulse: "animate-pulse",
      wave: [
        "relative overflow-hidden",
        "before:absolute before:inset-0 before:content-['']",
        "before:-translate-x-full",
        "before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent",
        "before:animate-[skeleton-wave_1.5s_linear_infinite]",
      ].join(" "),
      none: "",
    },
  },
  defaultVariants: {
    size: "md",
    animation: "pulse",
  },
});

export type SkeletonVariants = VariantProps<typeof skeletonVariants>;
