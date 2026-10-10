// src/ui/feedback/empty-state/index.ts

import {
  EmptyStateActions,
  EmptyStateContent,
  EmptyStateDescription,
  EmptyStateHeader,
  EmptyStateMedia,
  EmptyState as EmptyStateRoot,
  EmptyStateTitle,
} from "./EmptyState";

export const EmptyState = Object.assign(EmptyStateRoot, {
  Header: EmptyStateHeader,
  Media: EmptyStateMedia,
  Title: EmptyStateTitle,
  Description: EmptyStateDescription,
  Content: EmptyStateContent,
  Actions: EmptyStateActions,
});

export type {
  EmptyStateContentProps,
  EmptyStateDescriptionProps,
  EmptyStateHeaderProps,
  EmptyStateMediaProps,
  EmptyStateProps,
  EmptyStateTitleProps,
} from "./empty-state.types";
