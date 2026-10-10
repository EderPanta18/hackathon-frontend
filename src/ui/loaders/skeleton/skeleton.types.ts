// src/ui/loaders/skeleton/skeleton.types.ts

import type { HTMLAttributes } from "react";

export type SkeletonSize = "sm" | "md" | "lg" | "xl";

export type SkeletonAnimation = "pulse" | "wave" | "none";

export interface SkeletonProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  size?: SkeletonSize;
  animation?: SkeletonAnimation;
}
