// src/ui/overlay/sheet/sheet.variants.ts

import { cva, type VariantProps } from "class-variance-authority";

export const sheetContentVariants = cva(
  [
    "fixed z-50 flex flex-col gap-4",
    "bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg",
    "transition duration-200 ease-in-out",
    "data-open:animate-in data-open:fade-in-0",
    "data-closed:animate-out data-closed:fade-out-0",
  ].join(" "),
  {
    variants: {
      side: {
        top: [
          "inset-x-0 top-0 h-auto border-b",
          "data-open:slide-in-from-top-10",
          "data-closed:slide-out-to-top-10",
        ].join(" "),
        bottom: [
          "inset-x-0 bottom-0 h-auto border-t",
          "data-open:slide-in-from-bottom-10",
          "data-closed:slide-out-to-bottom-10",
        ].join(" "),
        left: [
          "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          "data-open:slide-in-from-left-10",
          "data-closed:slide-out-to-left-10",
        ].join(" "),
        right: [
          "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          "data-open:slide-in-from-right-10",
          "data-closed:slide-out-to-right-10",
        ].join(" "),
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

export type SheetContentVariants = VariantProps<typeof sheetContentVariants>;
