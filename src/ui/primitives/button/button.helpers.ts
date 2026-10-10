// src/ui/primitives/button/button.helpers.ts

import type { CSSProperties } from "react";
import {
  BUTTON_DOT_ANIMATION_DELAYS,
  BUTTON_ICON_SIZES,
  BUTTON_PENDING_STYLES,
} from "./button.constants";
import type { ButtonSize, ButtonType } from "./button.types";

export interface ButtonLayout {
  isIconSize: boolean;
}

export interface ButtonVisualState {
  disabled: boolean;
  pending: boolean;
  isInteractive: boolean;
}

export const resolveButtonLayout = (size: ButtonSize): ButtonLayout => ({
  isIconSize: BUTTON_ICON_SIZES.includes(size as (typeof BUTTON_ICON_SIZES)[number]),
});

export const resolveButtonVisualState = (
  disabled: boolean,
  pending: boolean,
): ButtonVisualState => {
  const isPending = pending;
  const isDisabled = !isPending && disabled;
  const isInteractive = !isDisabled && !isPending;

  return { disabled: isDisabled, pending: isPending, isInteractive };
};

export const resolveButtonType = (type: ButtonType): ButtonType => type;

export const getButtonPendingStyles = (size: ButtonSize) => BUTTON_PENDING_STYLES[size];

export const getButtonDotIndexes = (): number[] => BUTTON_DOT_ANIMATION_DELAYS.map((_, i) => i);

export const getButtonDotAnimationStyle = (dotIndex: number): CSSProperties => ({
  animationDelay: `${BUTTON_DOT_ANIMATION_DELAYS[dotIndex] ?? 0}ms`,
});
