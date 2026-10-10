// src/ui/navigation/tabs/tabs.constants.ts

import type { TabsListProps, TabsProps } from "./tabs.types";

export const TABS_DEFAULTS = {
  orientation: "horizontal",
} as const satisfies Required<Pick<TabsProps, "orientation">>;

export const TABS_LIST_DEFAULTS = {
  variant: "pill",
} as const satisfies Required<Pick<TabsListProps, "variant">>;
