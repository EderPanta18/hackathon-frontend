// src/ui/form/slider/Slider.tsx

"use client";

import { Slider as SliderPrimitive } from "radix-ui";
import { useMemo } from "react";
import { cn } from "@/lib/styling";
import { SLIDER_DEFAULTS } from "./slider.constants";
import type { SliderProps } from "./slider.types";

export const Slider = ({
  min = SLIDER_DEFAULTS.min,
  max = SLIDER_DEFAULTS.max,
  value,
  defaultValue,
  className,
  ...props
}: SliderProps) => {
  const _values = useMemo(
    () => (Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max]),
    [value, defaultValue, min, max],
  );

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none",
        "data-disabled:opacity-50",
        "data-vertical:h-full data-vertical:min-h-40",
        "data-vertical:w-auto data-vertical:flex-col",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "relative grow overflow-hidden rounded-full bg-muted",
          "data-horizontal:h-1 data-horizontal:w-full",
          "data-vertical:h-full data-vertical:w-1",
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="absolute bg-primary select-none data-horizontal:h-full data-vertical:w-full"
        />
      </SliderPrimitive.Track>

      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          data-slot="slider-thumb"
          className={cn(
            "relative block size-3 shrink-0 rounded-full select-none",
            "border border-ring bg-white ring-ring/50",
            "transition-[color,box-shadow]",
            "after:absolute after:-inset-2",
            "hover:ring-3",
            "focus-visible:ring-3 focus-visible:outline-hidden",
            "active:ring-3",
            "disabled:pointer-events-none disabled:opacity-50",
          )}
        />
      ))}
    </SliderPrimitive.Root>
  );
};

export default Slider;
