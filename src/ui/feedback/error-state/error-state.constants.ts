// src/ui/feedback/error-state/error-state.constants.ts

import type { ErrorStateMediaProps, ErrorStateProps } from "./error-state.types";

export const ERROR_STATE_DEFAULTS = {
  variant: "soft",
} as const satisfies Required<Pick<ErrorStateProps, "variant">>;

export const ERROR_STATE_MEDIA_DEFAULTS = {
  variant: "plain",
} as const satisfies Required<Pick<ErrorStateMediaProps, "variant">>;
