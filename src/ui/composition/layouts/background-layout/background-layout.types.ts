// src/ui/composition/layouts/background-layout/background-layout.types.ts

import type { HTMLAttributes } from "react";

export type BackgroundMode = "full-screen" | "container";

export type BackgroundAlign =
  | "center"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type BackgroundOverlay = "none" | "light" | "dark";

export interface BackgroundLayoutClassNames {
  content?: string;
  overlay?: string;
}

export interface BackgroundLayoutProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  alt?: string;
  mode?: BackgroundMode;
  align?: BackgroundAlign;
  overlay?: BackgroundOverlay;
  classNames?: BackgroundLayoutClassNames;
}
