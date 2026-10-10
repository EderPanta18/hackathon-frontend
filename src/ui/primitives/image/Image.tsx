// src/ui/primitives/image/Image.tsx

"use client";

import NextImage from "next/image";
import { forwardRef, type ReactEventHandler, useState } from "react";
import { cn } from "@/lib/styling";
import { IMAGE_DEFAULTS } from "./image.constants";
import type { ImageProps } from "./image.types";
import { imageInnerVariants, imageSkeletonVariants, imageWrapperVariants } from "./image.variants";

export const Image = forwardRef<HTMLDivElement, ImageProps>(function Image(
  {
    rounded = IMAGE_DEFAULTS.rounded,
    fit = IMAGE_DEFAULTS.fit,
    fill = IMAGE_DEFAULTS.fill,
    skeleton = IMAGE_DEFAULTS.skeleton,
    src,
    alt,
    onLoad,
    imageClassName,
    className,
    ...props
  },
  ref,
) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const handleLoad: ReactEventHandler<HTMLImageElement> = (event) => {
    setIsLoaded(true);
    onLoad?.(event);
  };

  return (
    <div
      ref={ref}
      data-slot="image"
      data-loaded={isLoaded || undefined}
      className={cn(
        imageWrapperVariants({ rounded }),
        fill ? "size-full" : "inline-block",
        className,
      )}
    >
      {skeleton !== false && !isLoaded && (
        <div aria-hidden="true" className={imageSkeletonVariants({ skeleton })} />
      )}

      <NextImage
        {...props}
        src={src}
        alt={alt}
        fill={fill}
        onLoad={handleLoad}
        className={cn(imageInnerVariants({ fit }), !isLoaded && "opacity-0", imageClassName)}
      />
    </div>
  );
});

Image.displayName = "Image";

export default Image;
