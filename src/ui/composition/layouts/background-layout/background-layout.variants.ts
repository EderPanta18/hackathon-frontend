// src/ui/composition/layouts/background-layout/background-layout.variants.ts

import { cva } from "class-variance-authority";

export const backgroundWrapperVariants = cva("relative", {
  variants: {
    mode: {
      "full-screen": "min-h-screen w-full",
      container: "size-full",
    },
  },
  defaultVariants: {
    mode: "full-screen",
  },
});

export const backgroundContentVariants = cva("flex relative", {
  variants: {
    mode: {
      "full-screen": "min-h-screen w-full",
      container: "w-full h-full",
    },
    align: {
      center: "items-center justify-center",
      top: "items-start justify-center",
      bottom: "items-end justify-center",
      left: "items-center justify-start",
      right: "items-center justify-end",
      "top-left": "items-start justify-start",
      "top-right": "items-start justify-end",
      "bottom-left": "items-end justify-start",
      "bottom-right": "items-end justify-end",
    },
  },
  defaultVariants: {
    mode: "full-screen",
    align: "center",
  },
});

export const backgroundOverlayVariants = cva("absolute inset-0", {
  variants: {
    overlay: {
      none: "hidden",
      light: "bg-white/30",
      dark: "bg-black/30",
    },
  },
  defaultVariants: {
    overlay: "none",
  },
});
