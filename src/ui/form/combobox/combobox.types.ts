// src/ui/form/combobox/combobox.types.ts

import type { Combobox as ComboboxPrimitive } from "@base-ui/react";
import type { ComponentProps, RefObject } from "react";

export interface ComboboxProps extends ComponentProps<typeof ComboboxPrimitive.Root> {}

export interface ComboboxValueProps extends ComboboxPrimitive.Value.Props {}

export interface ComboboxTriggerProps extends ComboboxPrimitive.Trigger.Props {}

export interface ComboboxClearProps extends ComboboxPrimitive.Clear.Props {}

export interface ComboboxInputProps extends ComboboxPrimitive.Input.Props {
  showTrigger?: boolean;
  showClear?: boolean;
  disabled?: boolean;
}

export interface ComboboxContentProps
  extends ComboboxPrimitive.Popup.Props,
    Pick<
      ComboboxPrimitive.Positioner.Props,
      "side" | "align" | "sideOffset" | "alignOffset" | "anchor"
    > {}

export interface ComboboxListProps extends ComboboxPrimitive.List.Props {}

export interface ComboboxItemProps extends ComboboxPrimitive.Item.Props {}

export interface ComboboxGroupProps extends ComboboxPrimitive.Group.Props {}

export interface ComboboxLabelProps extends ComboboxPrimitive.GroupLabel.Props {}

export interface ComboboxCollectionProps extends ComboboxPrimitive.Collection.Props {}

export interface ComboboxEmptyProps extends ComboboxPrimitive.Empty.Props {}

export interface ComboboxSeparatorProps extends ComboboxPrimitive.Separator.Props {}

export interface ComboboxChipsProps extends ComboboxPrimitive.Chips.Props {}

export interface ComboboxChipProps extends ComboboxPrimitive.Chip.Props {
  showRemove?: boolean;
}

export interface ComboboxChipsInputProps extends ComboboxPrimitive.Input.Props {}

export type ComboboxAnchorRef = RefObject<HTMLDivElement | null>;
