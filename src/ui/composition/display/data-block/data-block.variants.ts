// src/ui/composition/display/data-block/data-block.variants.ts

import { cva } from "class-variance-authority";

export const dataBlockVariants = cva(
  "group/data-block w-full rounded-2xl border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      size: {
        sm: "px-2 py-1",
        md: "px-3 py-2",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export const dataBlockGridVariants = cva("grid grid-cols-[max-content_1fr] items-start", {
  variants: {
    size: {
      sm: "gap-x-4 gap-y-1",
      md: "gap-x-5 gap-y-1.5",
    },
  },
  defaultVariants: { size: "md" },
});

export const dataBlockValueVariants = cva(
  "min-w-0 break-words text-left text-sm group-data-[size=sm]/data-block:text-xs",
  {
    variants: {
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        highlight: "font-semibold text-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
);
