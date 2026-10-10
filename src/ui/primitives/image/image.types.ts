// src/ui/primitives/image/image.types.ts

import type { ImageProps as NextImageProps } from "next/image";

export type ImageRounded = "none" | "sm" | "md" | "lg" | "xl" | "full";

export type ImageFit = "cover" | "contain" | "fill" | "none" | "scale-down";

export type ImageSkeleton = "pulse" | "wave" | false;

type NativeImageProps = Omit<NextImageProps, "fill" | "onLoadingComplete">;

export interface ImageProps extends NativeImageProps {
  rounded?: ImageRounded;
  fit?: ImageFit;
  fill?: boolean;
  skeleton?: ImageSkeleton;
  imageClassName?: string;
}
