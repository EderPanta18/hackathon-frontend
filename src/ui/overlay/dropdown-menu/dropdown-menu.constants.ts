// src/ui/overlay/dropdown-menu/dropdown-menu.constants.ts

import type { DropdownMenuContentProps, DropdownMenuItemProps } from "./dropdown-menu.types";

export const DROPDOWN_MENU_CONTENT_DEFAULTS = {
  align: "start",
  sideOffset: 4,
} as const satisfies Required<Pick<DropdownMenuContentProps, "align" | "sideOffset">>;

export const DROPDOWN_MENU_ITEM_DEFAULTS = {
  variant: "neutral",
} as const satisfies Required<Pick<DropdownMenuItemProps, "variant">>;
