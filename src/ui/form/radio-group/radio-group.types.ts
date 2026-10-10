// src/ui/form/radio-group/radio-group.types.ts

import type { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import type { ComponentProps } from "react";

export type RadioGroupSize = "xs" | "md";

export type RadioGroupTone = "primary" | "secondary" | "neutral";

type NativeItemProps = ComponentProps<typeof RadioGroupPrimitive.Item>;

export interface RadioGroupProps extends ComponentProps<typeof RadioGroupPrimitive.Root> {}

export interface RadioGroupItemProps extends NativeItemProps {
  size?: RadioGroupSize;
  tone?: RadioGroupTone;
}
