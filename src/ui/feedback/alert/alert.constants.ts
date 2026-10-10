// src/ui/feedback/alert/alert.constants.ts

import type { AlertProps } from "./alert.types";

export const ALERT_DEFAULTS = {
  tone: "neutral",
  variant: "solid",
} as const satisfies Required<Pick<AlertProps, "tone" | "variant">>;
