// src/ui/overlay/drawer/drawer.types.ts

import type { ComponentProps } from "react";
import type { Drawer as DrawerPrimitive } from "vaul";

export type DrawerProps = ComponentProps<typeof DrawerPrimitive.Root>;

export interface DrawerTriggerProps extends ComponentProps<typeof DrawerPrimitive.Trigger> {}

export interface DrawerPortalProps extends ComponentProps<typeof DrawerPrimitive.Portal> {}

export interface DrawerCloseProps extends ComponentProps<typeof DrawerPrimitive.Close> {}

export interface DrawerOverlayProps extends ComponentProps<typeof DrawerPrimitive.Overlay> {}

export interface DrawerContentProps extends ComponentProps<typeof DrawerPrimitive.Content> {}

export interface DrawerHeaderProps extends ComponentProps<"div"> {}

export interface DrawerFooterProps extends ComponentProps<"div"> {}

export interface DrawerTitleProps extends ComponentProps<typeof DrawerPrimitive.Title> {}

export interface DrawerDescriptionProps
  extends ComponentProps<typeof DrawerPrimitive.Description> {}
