// src/ui/display/item/item.constants.ts

import type { ItemMediaProps, ItemProps } from "./item.types";

export const ITEM_DEFAULTS = {
  variant: "ghost",
  size: "md",
} as const satisfies Required<Pick<ItemProps, "variant" | "size">>;

export const ITEM_MEDIA_DEFAULTS = {
  variant: "plain",
} as const satisfies Required<Pick<ItemMediaProps, "variant">>;
