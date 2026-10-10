// src/ui/navigation/tabs/tabs.types.ts

import type { Tabs as TabsPrimitive } from "radix-ui";
import type { ComponentProps } from "react";

export type TabsListVariant = "pill" | "line";

export interface TabsProps extends ComponentProps<typeof TabsPrimitive.Root> {}

export interface TabsListProps extends ComponentProps<typeof TabsPrimitive.List> {
  variant?: TabsListVariant;
}

export interface TabsTriggerProps extends ComponentProps<typeof TabsPrimitive.Trigger> {}

export interface TabsContentProps extends ComponentProps<typeof TabsPrimitive.Content> {}
