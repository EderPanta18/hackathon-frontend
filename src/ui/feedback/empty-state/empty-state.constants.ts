// src/ui/feedback/empty-state/empty-state.constants.ts

import type { EmptyStateMediaProps } from "./empty-state.types";

export const EMPTY_STATE_MEDIA_DEFAULTS = {
  variant: "plain",
} as const satisfies Required<Pick<EmptyStateMediaProps, "variant">>;
