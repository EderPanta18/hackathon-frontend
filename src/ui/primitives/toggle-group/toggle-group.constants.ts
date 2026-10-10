// src/ui/primitives/toggle-group/toggle-group.constants.ts

import type {
  ToggleGroupContextValues,
  ToggleGroupItemProps,
  ToggleGroupProps,
} from "./toggle-group.types";

export const TOGGLE_GROUP_CONTEXT_DEFAULTS = {
  size: "md",
  variant: "ghost",
  orientation: "horizontal",
  spacing: 0,
} as const satisfies Required<ToggleGroupContextValues>;

export const TOGGLE_GROUP_DEFAULTS = {
  size: TOGGLE_GROUP_CONTEXT_DEFAULTS.size,
  variant: TOGGLE_GROUP_CONTEXT_DEFAULTS.variant,
  spacing: TOGGLE_GROUP_CONTEXT_DEFAULTS.spacing,
  orientation: TOGGLE_GROUP_CONTEXT_DEFAULTS.orientation,
} as const satisfies Required<
  Pick<ToggleGroupProps, "size" | "variant" | "orientation" | "spacing">
>;

export const TOGGLE_GROUP_ITEM_DEFAULTS = {
  size: TOGGLE_GROUP_CONTEXT_DEFAULTS.size,
  variant: TOGGLE_GROUP_CONTEXT_DEFAULTS.variant,
} as const satisfies Required<Pick<ToggleGroupItemProps, "size" | "variant">>;
