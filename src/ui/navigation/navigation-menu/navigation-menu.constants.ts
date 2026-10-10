// src/ui/navigation/navigation-menu/navigation-menu.constants.ts

import type { NavigationMenuProps } from "./navigation-menu.types";

export const NAVIGATION_MENU_DEFAULTS = {
  viewport: true,
} as const satisfies Required<Pick<NavigationMenuProps, "viewport">>;
