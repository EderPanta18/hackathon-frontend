// src/ui/navigation/sidebar/sidebar.constants.ts

export const SIDEBAR_COOKIE_NAME = "sidebarState";
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export const SIDEBAR_WIDTH = "16rem";
export const SIDEBAR_WIDTH_MOBILE = "18rem";
export const SIDEBAR_WIDTH_ICON = "3rem";

export const SIDEBAR_KEYBOARD_SHORTCUT = "b";

export const SIDEBAR_PROVIDER_DEFAULTS = {
  defaultOpen: true,
} as const satisfies {
  defaultOpen: boolean;
};
