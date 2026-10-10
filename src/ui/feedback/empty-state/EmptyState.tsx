// src/ui/feedback/empty-state/EmptyState.tsx

import { cn } from "@/lib/styling";
import { EMPTY_STATE_MEDIA_DEFAULTS } from "./empty-state.constants";
import type {
  EmptyStateActionsProps,
  EmptyStateContentProps,
  EmptyStateDescriptionProps,
  EmptyStateHeaderProps,
  EmptyStateMediaProps,
  EmptyStateProps,
  EmptyStateTitleProps,
} from "./empty-state.types";
import { emptyStateMediaVariants } from "./empty-state.variants";

const EmptyState = ({ className, ...props }: EmptyStateProps) => (
  <div
    data-slot="empty-state"
    className={cn(
      "flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4",
      "rounded-xl border-dashed border p-6 text-center text-balance",
      className,
    )}
    {...props}
  />
);

const EmptyStateHeader = ({ className, ...props }: EmptyStateHeaderProps) => (
  <div
    data-slot="empty-state-header"
    className={cn("flex max-w-sm flex-col items-center gap-2", className)}
    {...props}
  />
);

const EmptyStateMedia = ({
  variant = EMPTY_STATE_MEDIA_DEFAULTS.variant,
  className,
  ...props
}: EmptyStateMediaProps) => (
  <div
    data-slot="empty-state-media"
    data-variant={variant}
    className={cn(emptyStateMediaVariants({ variant, className }))}
    {...props}
  />
);

const EmptyStateTitle = ({ className, ...props }: EmptyStateTitleProps) => (
  <div
    data-slot="empty-state-title"
    className={cn("font-heading text-sm font-medium tracking-tight", className)}
    {...props}
  />
);

const EmptyStateDescription = ({ className, ...props }: EmptyStateDescriptionProps) => (
  <div
    data-slot="empty-state-description"
    className={cn(
      "text-sm/relaxed text-muted-foreground",
      "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
      className,
    )}
    {...props}
  />
);

const EmptyStateContent = ({ className, ...props }: EmptyStateContentProps) => (
  <div
    data-slot="empty-state-content"
    className={cn(
      "flex w-full max-w-sm min-w-0 flex-col items-center gap-2.5 text-sm text-balance",
      className,
    )}
    {...props}
  />
);

const EmptyStateActions = ({ className, ...props }: EmptyStateActionsProps) => (
  <div
    data-slot="empty-state-actions"
    className={cn("flex items-center justify-center gap-2", className)}
    {...props}
  />
);

export {
  EmptyState,
  EmptyStateHeader,
  EmptyStateMedia,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateContent,
  EmptyStateActions,
};
