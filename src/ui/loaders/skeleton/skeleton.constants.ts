// src/ui/loaders/skeleton/skeleton.constants.ts

import type { SkeletonProps } from "./skeleton.types";

export const SKELETON_DEFAULTS = {
  size: "md",
  animation: "pulse",
  "aria-hidden": true,
} as const satisfies Required<Pick<SkeletonProps, "size" | "animation" | "aria-hidden">>;
