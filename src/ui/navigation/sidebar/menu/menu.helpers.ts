// src/ui/navigation/sidebar/menu/menu.helpers.ts

import {
  SIDEBAR_MENU_SKELETON_WIDTH_MIN,
  SIDEBAR_MENU_SKELETON_WIDTH_RANGE,
} from "./menu.constants";

export const getMenuSkeletonRandomWidth = (): string =>
  `${Math.floor(Math.random() * SIDEBAR_MENU_SKELETON_WIDTH_RANGE) + SIDEBAR_MENU_SKELETON_WIDTH_MIN}%`;
