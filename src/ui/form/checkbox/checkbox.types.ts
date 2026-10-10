// src/ui/form/checkbox/checkbox.types.ts

import type { Checkbox as CheckboxPrimitive } from "radix-ui";
import type { ComponentProps } from "react";

export type CheckboxSize = "sm" | "md";

export type CheckboxTone = "primary" | "secondary" | "neutral";

type NativeCheckboxProps = ComponentProps<typeof CheckboxPrimitive.Root>;

export interface CheckboxProps extends NativeCheckboxProps {
  size?: CheckboxSize;
  tone?: CheckboxTone;
}
