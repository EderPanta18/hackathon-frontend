// src/ui/loaders/skeleton/Skeleton.tsx

import { cn } from "@/lib/styling";
import { SKELETON_DEFAULTS } from "./skeleton.constants";
import type { SkeletonProps } from "./skeleton.types";
import { skeletonVariants } from "./skeleton.variants";

export const Skeleton = ({
  size = SKELETON_DEFAULTS.size,
  animation = SKELETON_DEFAULTS.animation,
  "aria-hidden": ariaHidden = SKELETON_DEFAULTS["aria-hidden"],
  className,
  ...props
}: SkeletonProps) => (
  <div
    data-slot="skeleton"
    data-size={size}
    data-animation={animation}
    aria-hidden={ariaHidden}
    className={cn(skeletonVariants({ size, animation }), className)}
    {...props}
  />
);

export default Skeleton;
