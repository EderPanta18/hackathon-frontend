// src/ui/feedback/error-state/index.ts

import {
  ErrorStateActions,
  ErrorStateContent,
  ErrorStateDescription,
  ErrorStateHeader,
  ErrorStateMedia,
  ErrorState as ErrorStateRoot,
  ErrorStateTitle,
} from "./ErrorState";

export const ErrorState = Object.assign(ErrorStateRoot, {
  Header: ErrorStateHeader,
  Media: ErrorStateMedia,
  Title: ErrorStateTitle,
  Description: ErrorStateDescription,
  Content: ErrorStateContent,
  Actions: ErrorStateActions,
});

export type {
  ErrorStateActionsProps,
  ErrorStateContentProps,
  ErrorStateDescriptionProps,
  ErrorStateHeaderProps,
  ErrorStateMediaProps,
  ErrorStateProps,
  ErrorStateTitleProps,
} from "./error-state.types";
