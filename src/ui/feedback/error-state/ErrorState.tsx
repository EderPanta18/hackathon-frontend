// src/ui/feedback/error-state/ErrorState.tsx

import { cn } from "@/lib/styling/index";
import { ERROR_STATE_DEFAULTS, ERROR_STATE_MEDIA_DEFAULTS } from "./error-state.constants";
import type {
  ErrorStateActionsProps,
  ErrorStateContentProps,
  ErrorStateDescriptionProps,
  ErrorStateHeaderProps,
  ErrorStateMediaProps,
  ErrorStateProps,
  ErrorStateTitleProps,
} from "./error-state.types";
import { errorStateMediaVariants, errorStateVariants } from "./error-state.variants";

const ErrorState = ({
  variant = ERROR_STATE_DEFAULTS.variant,
  className,
  ...props
}: ErrorStateProps) => (
  <div
    role="alert"
    data-slot="error-state"
    data-variant={variant}
    className={cn(errorStateVariants({ variant, className }))}
    {...props}
  />
);

const ErrorStateHeader = ({ className, ...props }: ErrorStateHeaderProps) => (
  <div
    data-slot="error-state-header"
    className={cn("flex max-w-sm flex-col items-center gap-2", className)}
    {...props}
  />
);

const ErrorStateMedia = ({
  variant = ERROR_STATE_MEDIA_DEFAULTS.variant,
  className,
  ...props
}: ErrorStateMediaProps) => (
  <div
    data-slot="error-state-media"
    data-variant={variant}
    className={cn(errorStateMediaVariants({ variant, className }))}
    {...props}
  />
);

const ErrorStateTitle = ({ className, ...props }: ErrorStateTitleProps) => (
  <div
    data-slot="error-state-title"
    className={cn(
      "font-heading text-sm font-medium tracking-tight text-destructive",
      "dark:text-destructive",
      className,
    )}
    {...props}
  />
);

const ErrorStateDescription = ({ className, ...props }: ErrorStateDescriptionProps) => (
  <p
    data-slot="error-state-description"
    className={cn(
      "text-sm/relaxed text-muted-foreground",
      "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-destructive",
      className,
    )}
    {...props}
  />
);

const ErrorStateContent = ({ className, ...props }: ErrorStateContentProps) => (
  <div
    data-slot="error-state-content"
    className={cn(
      "flex w-full max-w-sm min-w-0 flex-col items-center gap-2.5 text-sm text-balance",
      className,
    )}
    {...props}
  />
);

const ErrorStateActions = ({ className, ...props }: ErrorStateActionsProps) => (
  <div
    data-slot="error-state-actions"
    className={cn("flex items-center justify-center gap-2", className)}
    {...props}
  />
);

export {
  ErrorState,
  ErrorStateHeader,
  ErrorStateMedia,
  ErrorStateTitle,
  ErrorStateDescription,
  ErrorStateContent,
  ErrorStateActions,
};
