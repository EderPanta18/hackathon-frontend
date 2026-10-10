// src/ui/navigation/menubar/menubar.constants.ts

import type { MenubarContentProps, MenubarItemProps } from "./menubar.types";

export const MENUBAR_CONTENT_DEFAULTS = {
  align: "start",
  alignOffset: -4,
  sideOffset: 8,
} as const satisfies Required<Pick<MenubarContentProps, "align" | "alignOffset" | "sideOffset">>;

export const MENUBAR_ITEM_DEFAULTS = {
  variant: "neutral",
} as const satisfies Required<Pick<MenubarItemProps, "variant">>;
