// src/ui/primitives/image/image.constants.ts

import type { ImageProps } from "./image.types";

export const IMAGE_DEFAULTS = {
  rounded: "md",
  fit: "cover",
  fill: false,
  skeleton: "pulse",
} as const satisfies Required<Pick<ImageProps, "rounded" | "fit" | "fill" | "skeleton">>;
