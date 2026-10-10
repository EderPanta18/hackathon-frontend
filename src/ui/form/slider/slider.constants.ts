// src/ui/form/slider/slider.constants.ts

import type { SliderProps } from "./slider.types";

export const SLIDER_DEFAULTS = {
  min: 0,
  max: 100,
} as const satisfies Required<Pick<SliderProps, "min" | "max">>;
