// src/ui/navigation/menubar/menubar.types.ts

import type { Menubar as MenubarPrimitive } from "radix-ui";
import type { ComponentProps } from "react";

export type MenubarItemVariant = "neutral" | "destructive";

export interface MenubarProps extends ComponentProps<typeof MenubarPrimitive.Root> {}

export interface MenubarMenuProps extends ComponentProps<typeof MenubarPrimitive.Menu> {}

export interface MenubarGroupProps extends ComponentProps<typeof MenubarPrimitive.Group> {}

export interface MenubarPortalProps extends ComponentProps<typeof MenubarPrimitive.Portal> {}

export interface MenubarRadioGroupProps
  extends ComponentProps<typeof MenubarPrimitive.RadioGroup> {}

export interface MenubarTriggerProps extends ComponentProps<typeof MenubarPrimitive.Trigger> {}

export interface MenubarContentProps extends ComponentProps<typeof MenubarPrimitive.Content> {}

export interface MenubarItemProps extends ComponentProps<typeof MenubarPrimitive.Item> {
  variant?: MenubarItemVariant;
  inset?: boolean;
}

export interface MenubarCheckboxItemProps
  extends ComponentProps<typeof MenubarPrimitive.CheckboxItem> {
  inset?: boolean;
}

export interface MenubarRadioItemProps extends ComponentProps<typeof MenubarPrimitive.RadioItem> {
  inset?: boolean;
}

export interface MenubarLabelProps extends ComponentProps<typeof MenubarPrimitive.Label> {
  inset?: boolean;
}

export interface MenubarSeparatorProps extends ComponentProps<typeof MenubarPrimitive.Separator> {}

export interface MenubarShortcutProps extends ComponentProps<"span"> {}

export interface MenubarSubProps extends ComponentProps<typeof MenubarPrimitive.Sub> {}

export interface MenubarSubTriggerProps extends ComponentProps<typeof MenubarPrimitive.SubTrigger> {
  inset?: boolean;
}

export interface MenubarSubContentProps
  extends ComponentProps<typeof MenubarPrimitive.SubContent> {}
