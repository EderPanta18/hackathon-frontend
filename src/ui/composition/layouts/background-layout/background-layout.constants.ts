// src/ui/composition/layouts/background-layout/background-layout.constants.ts

import type { BackgroundLayoutProps } from "./background-layout.types";

export const BACKGROUND_LAYOUT_DEFAULTS = {
  mode: "full-screen",
  align: "center",
  overlay: "dark",
  alt: "Fondo de pantalla",
} as const satisfies Required<Pick<BackgroundLayoutProps, "alt" | "mode" | "align" | "overlay">>;
