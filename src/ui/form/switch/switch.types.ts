// src/ui/form/switch/switch.types.ts

import type { Switch as SwitchPrimitive } from "radix-ui";
import type { ComponentProps } from "react";

export type SwitchSize = "sm" | "md";

export type SwitchTone = "primary" | "secondary" | "neutral";

type NativeSwitchProps = ComponentProps<typeof SwitchPrimitive.Root>;

export interface SwitchProps extends NativeSwitchProps {
  size?: SwitchSize;
  tone?: SwitchTone;
}
