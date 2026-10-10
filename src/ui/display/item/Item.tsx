// src/ui/display/item/Item.tsx

import { Slot } from "radix-ui";
import { cn } from "@/lib/styling";
import { Separator } from "@/ui/primitives/separator";
import { ITEM_DEFAULTS, ITEM_MEDIA_DEFAULTS } from "./item.constants";
import type {
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
import { itemMediaVariants, itemVariants } from "./item.variants";

const ItemGroup = ({ className, ...props }: ItemGroupProps) => (
  // biome-ignore lint/a11y/useSemanticElements: ItemGroup is a generic container, not always a list
  <div
    role="list"
    data-slot="item-group"
    className={cn(
      "group/item-group flex w-full flex-col gap-4",
      "has-data-[size=sm]:gap-2.5 has-data-[size=xs]:gap-2",
      className,
    )}
    {...props}
  />
);

const ItemSeparator = ({ className, ...props }: ItemSeparatorProps) => (
  <Separator
    data-slot="item-separator"
    orientation="horizontal"
    className={cn("my-1", className)}
    {...props}
  />
);

const Item = ({
  variant = ITEM_DEFAULTS.variant,
  size = ITEM_DEFAULTS.size,
  asChild,
  className,
  ...props
}: ItemProps) => {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      data-slot="item"
      data-variant={variant}
      data-size={size}
      className={cn(itemVariants({ variant, size, className }))}
      {...props}
    />
  );
};

const ItemMedia = ({
  variant = ITEM_MEDIA_DEFAULTS.variant,
  className,
  ...props
}: ItemMediaProps) => (
  <div
    data-slot="item-media"
    data-variant={variant}
    className={cn(itemMediaVariants({ variant, className }))}
    {...props}
  />
);

const ItemContent = ({ className, ...props }: ItemContentProps) => (
  <div
    data-slot="item-content"
    className={cn(
      "flex flex-1 flex-col gap-1",
      "group-data-[size=xs]/item:gap-0",
      "[&+[data-slot=item-content]]:flex-none",
      className,
    )}
    {...props}
  />
);

const ItemTitle = ({ className, ...props }: ItemTitleProps) => (
  <div
    data-slot="item-title"
    className={cn(
      "font-heading line-clamp-1 flex w-fit items-center gap-2",
      "text-sm leading-snug font-medium underline-offset-4",
      className,
    )}
    {...props}
  />
);

const ItemDescription = ({ className, ...props }: ItemDescriptionProps) => (
  <p
    data-slot="item-description"
    className={cn(
      "line-clamp-2 text-left text-sm leading-normal font-normal text-muted-foreground",
      "group-data-[size=xs]/item:text-xs",
      "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
      className,
    )}
    {...props}
  />
);

const ItemActions = ({ className, ...props }: ItemActionsProps) => (
  <div data-slot="item-actions" className={cn("flex items-center gap-2", className)} {...props} />
);

const ItemHeader = ({ className, ...props }: ItemHeaderProps) => (
  <div
    data-slot="item-header"
    className={cn("flex basis-full items-center justify-between gap-2", className)}
    {...props}
  />
);

const ItemFooter = ({ className, ...props }: ItemFooterProps) => (
  <div
    data-slot="item-footer"
    className={cn("flex basis-full items-center justify-between gap-2", className)}
    {...props}
  />
);

export {
  ItemGroup,
  ItemSeparator,
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemHeader,
  ItemFooter,
};
