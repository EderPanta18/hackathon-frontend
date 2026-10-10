// src/ui/form/slider/slider.types.ts

import type { Slider as SliderPrimitive } from "radix-ui";
import type { ComponentProps } from "react";

export interface SliderProps extends ComponentProps<typeof SliderPrimitive.Root> {}
