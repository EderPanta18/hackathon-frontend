// src/ui/primitives/toggle-group/toggle-group.types.ts

import type { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import type { ToggleSize, ToggleVariant } from "@/ui/primitives/toggle";

export interface ToggleGroupContextValues {
  size?: ToggleSize;
  variant?: ToggleVariant;
  orientation?: ToggleGroupOrientation;
  spacing?: number;
}

export type ToggleGroupOrientation = "horizontal" | "vertical";

export type ToggleGroupProps = ComponentProps<typeof ToggleGroupPrimitive.Root> & {
  size?: ToggleSize;
  variant?: ToggleVariant;
  orientation?: ToggleGroupOrientation;
  spacing?: number;
};

export interface ToggleGroupItemProps extends ComponentProps<typeof ToggleGroupPrimitive.Item> {
  size?: ToggleSize;
  variant?: ToggleVariant;
}
