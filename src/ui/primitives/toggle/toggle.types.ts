// src/ui/primitives/toggle/toggle.types.ts

import type { Toggle as TogglePrimitive } from "radix-ui";
import type { ComponentProps } from "react";

export type ToggleSize = "sm" | "md" | "lg";

export type ToggleVariant = "ghost" | "outline";

type NativeToggleProps = ComponentProps<typeof TogglePrimitive.Root>;

export interface ToggleProps extends NativeToggleProps {
  size?: ToggleSize;
  variant?: ToggleVariant;
}
