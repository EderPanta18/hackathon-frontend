// src/ui/overlay/dropdown-menu/dropdown-menu.types.ts

import type { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import type { ComponentProps } from "react";

export type DropdownMenuItemVariant = "neutral" | "destructive";

export interface DropdownMenuProps extends ComponentProps<typeof DropdownMenuPrimitive.Root> {}

export interface DropdownMenuPortalProps
  extends ComponentProps<typeof DropdownMenuPrimitive.Portal> {}

export interface DropdownMenuTriggerProps
  extends ComponentProps<typeof DropdownMenuPrimitive.Trigger> {}

export interface DropdownMenuContentProps
  extends ComponentProps<typeof DropdownMenuPrimitive.Content> {}

export interface DropdownMenuGroupProps
  extends ComponentProps<typeof DropdownMenuPrimitive.Group> {}

export interface DropdownMenuItemProps extends ComponentProps<typeof DropdownMenuPrimitive.Item> {
  variant?: DropdownMenuItemVariant;
  inset?: boolean;
}

export interface DropdownMenuCheckboxItemProps
  extends ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem> {
  inset?: boolean;
}

export interface DropdownMenuRadioGroupProps
  extends ComponentProps<typeof DropdownMenuPrimitive.RadioGroup> {}

export interface DropdownMenuRadioItemProps
  extends ComponentProps<typeof DropdownMenuPrimitive.RadioItem> {
  inset?: boolean;
}

export interface DropdownMenuLabelProps extends ComponentProps<typeof DropdownMenuPrimitive.Label> {
  inset?: boolean;
}

export interface DropdownMenuSeparatorProps
  extends ComponentProps<typeof DropdownMenuPrimitive.Separator> {}

export interface DropdownMenuShortcutProps extends ComponentProps<"span"> {}

export interface DropdownMenuSubProps extends ComponentProps<typeof DropdownMenuPrimitive.Sub> {}

export interface DropdownMenuSubTriggerProps
  extends ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> {
  inset?: boolean;
}

export interface DropdownMenuSubContentProps
  extends ComponentProps<typeof DropdownMenuPrimitive.SubContent> {}
