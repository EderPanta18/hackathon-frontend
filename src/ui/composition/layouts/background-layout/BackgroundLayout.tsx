// src/ui/composition/layouts/background-layout/BackgroundLayout.tsx

"use client";

import { cn } from "@/lib/styling";
import { Image } from "@/ui/primitives";
import { BACKGROUND_LAYOUT_DEFAULTS } from "./background-layout.constants";
import type { BackgroundLayoutProps } from "./background-layout.types";
import {
  backgroundContentVariants,
  backgroundOverlayVariants,
  backgroundWrapperVariants,
} from "./background-layout.variants";

export const BackgroundLayout = ({
  mode = BACKGROUND_LAYOUT_DEFAULTS.mode,
  align = BACKGROUND_LAYOUT_DEFAULTS.align,
  overlay = BACKGROUND_LAYOUT_DEFAULTS.overlay,
  alt = BACKGROUND_LAYOUT_DEFAULTS.alt,
  src,
  classNames,
  className,
  children,
  ...props
}: BackgroundLayoutProps) => (
  <div
    data-slot="background-layout"
    data-mode={mode}
    data-overlay={overlay}
    className={cn(backgroundWrapperVariants({ mode }), className)}
    {...props}
  >
    <div className="absolute inset-0 -z-10">
      <Image
        src={src}
        alt={alt}
        fill
        fit="cover"
        skeleton="pulse"
        loading="eager"
        fetchPriority="high"
      />
    </div>

    <div
      className={cn(backgroundOverlayVariants({ overlay }), classNames?.overlay)}
      aria-hidden="true"
    />

    <div className={cn(backgroundContentVariants({ mode, align }), classNames?.content)}>
      {children}
    </div>
  </div>
);

export default BackgroundLayout;
