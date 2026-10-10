// src/ui/primitives/button/button.constants.ts

import type { ButtonProps, ButtonSize } from "./button.types";

export const BUTTON_DEFAULTS = {
  type: "button",
  size: "md",
  tone: "primary",
  variant: "solid",
  pending: false,
  announceLabel: "Cargando",
  disabled: false,
} as const satisfies Required<
  Pick<ButtonProps, "type" | "size" | "tone" | "variant" | "pending" | "announceLabel" | "disabled">
>;

export const BUTTON_ICON_SIZES: readonly ButtonSize[] = ["icon-xs", "icon-sm", "icon", "icon-lg"];

export const BUTTON_DOT_ANIMATION_DELAYS = [0, 140, 280];

export const BUTTON_PENDING_STYLES = {
  xs: {
    bottomPadding: "pb-2",
    dotsPosition: "bottom-0.5",
    dotSize: "size-0.75",
    dotsGap: "gap-1",
  },
  sm: {
    bottomPadding: "pb-2.5",
    dotsPosition: "bottom-1",
    dotSize: "size-1",
    dotsGap: "gap-1",
  },
  md: {
    bottomPadding: "pb-3",
    dotsPosition: "bottom-1",
    dotSize: "size-1.5",
    dotsGap: "gap-1",
  },
  lg: {
    bottomPadding: "pb-4",
    dotsPosition: "bottom-1.5",
    dotSize: "size-2",
    dotsGap: "gap-1.5",
  },
  "icon-xs": {
    bottomPadding: "",
    dotsPosition: "",
    dotSize: "size-0.5",
    dotsGap: "gap-0.5",
  },
  "icon-sm": {
    bottomPadding: "",
    dotsPosition: "",
    dotSize: "size-1",
    dotsGap: "gap-0.75",
  },
  icon: {
    bottomPadding: "",
    dotsPosition: "",
    dotSize: "size-1.5",
    dotsGap: "gap-1",
  },
  "icon-lg": {
    bottomPadding: "",
    dotsPosition: "",
    dotSize: "size-2",
    dotsGap: "gap-1",
  },
} as const satisfies Record<
  ButtonSize,
  {
    bottomPadding: string;
    dotsPosition: string;
    dotSize: string;
    dotsGap: string;
  }
>;
