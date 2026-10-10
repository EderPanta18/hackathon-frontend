// src/ui/form/select/select.types.ts

import type { Select as SelectPrimitive } from "radix-ui";
import type { ComponentProps } from "react";

export type SelectTriggerSize = "sm" | "md";

export type SelectContentPosition = "item-aligned" | "popper";

export type SelectContentAlignment = "start" | "center" | "end";

export interface SelectProps extends ComponentProps<typeof SelectPrimitive.Root> {}

export interface SelectGroupProps extends ComponentProps<typeof SelectPrimitive.Group> {}

export interface SelectValueProps extends ComponentProps<typeof SelectPrimitive.Value> {}

export interface SelectTriggerProps extends ComponentProps<typeof SelectPrimitive.Trigger> {
  size?: SelectTriggerSize;
}

export interface SelectContentProps extends ComponentProps<typeof SelectPrimitive.Content> {}

export interface SelectLabelProps extends ComponentProps<typeof SelectPrimitive.Label> {}

export interface SelectItemProps extends ComponentProps<typeof SelectPrimitive.Item> {}

export interface SelectSeparatorProps extends ComponentProps<typeof SelectPrimitive.Separator> {}

export type SelectScrollButtonProps = ComponentProps<typeof SelectPrimitive.ScrollUpButton>;
