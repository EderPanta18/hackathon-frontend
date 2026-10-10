// src/ui/display/item/index.ts

import {
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  Item as ItemRoot,
  ItemSeparator,
  ItemTitle,
} from "./Item";

export const Item = Object.assign(ItemRoot, {
  Group: ItemGroup,
  Media: ItemMedia,
  Content: ItemContent,
  Actions: ItemActions,
  Separator: ItemSeparator,
  Title: ItemTitle,
  Description: ItemDescription,
  Header: ItemHeader,
  Footer: ItemFooter,
});

export type {
  ItemActionsProps,
  ItemContentProps,
  ItemDescriptionProps,
  ItemFooterProps,
  ItemGroupProps,
  ItemHeaderProps,
  ItemMediaProps,
  ItemProps,
  ItemSeparatorProps,
  ItemTitleProps,
} from "./item.types";
