// src/ui/feedback/alert/Alert.tsx

import { cn } from "@/lib/styling";
import { ALERT_DEFAULTS } from "./alert.constants";
import type {
  AlertActionProps,
  AlertDescriptionProps,
  AlertProps,
  AlertTitleProps,
} from "./alert.types";
import { alertVariants } from "./alert.variants";

const Alert = ({
  tone = ALERT_DEFAULTS.tone,
  variant = ALERT_DEFAULTS.variant,
  className,
  ...props
}: AlertProps) => (
  <div
    role="alert"
    data-slot="alert"
    data-tone={tone}
    data-variant={variant}
    className={cn(alertVariants({ tone, variant }), className)}
    {...props}
  />
);

const AlertTitle = ({ className, ...props }: AlertTitleProps) => (
  <div
    data-slot="alert-title"
    className={cn(
      "font-heading font-medium group-has-[>svg]/alert:col-start-2",
      "[&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
      "group-data-[tone=success]/alert:text-success",
      "group-data-[tone=destructive]/alert:text-destructive",
      "dark:group-data-[tone=success]/alert:text-success",
      "dark:group-data-[tone=destructive]/alert:text-destructive",
      className,
    )}
    {...props}
  />
);

const AlertDescription = ({ className, ...props }: AlertDescriptionProps) => (
  <div
    data-slot="alert-description"
    className={cn(
      "text-sm text-balance text-muted-foreground md:text-pretty",
      "group-has-[>svg]/alert:col-start-2",
      "[&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
      "[&_p:not(:last-child)]:mb-4",
      // tono afecta color de la descripción levemente
      "group-data-[tone=success]/alert:text-success/80",
      "group-data-[tone=destructive]/alert:text-destructive/80",
      className,
    )}
    {...props}
  />
);

const AlertAction = ({ className, ...props }: AlertActionProps) => (
  <div data-slot="alert-action" className={cn("absolute top-2 right-2", className)} {...props} />
);

export { Alert, AlertTitle, AlertDescription, AlertAction };
