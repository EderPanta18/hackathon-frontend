// src/ui/overlay/context-menu/context-menu.constants.ts

import type { ContextMenuItemProps } from "./context-menu.types";

export const CONTEXT_MENU_ITEM_DEFAULTS = {
  variant: "neutral",
} as const satisfies Required<Pick<ContextMenuItemProps, "variant">>;
