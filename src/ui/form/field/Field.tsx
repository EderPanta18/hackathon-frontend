// src/ui/form/field/Field.tsx

"use client";

import { useMemo } from "react";
import { cn } from "@/lib/styling";
import { Label } from "@/ui/form/label";
import { Separator } from "@/ui/primitives/separator";
import { FIELD_DEFAULTS, FIELD_LEGEND_DEFAULTS } from "./field.constants";
import type {
  FieldContentProps,
  FieldDescriptionProps,
  FieldErrorProps,
  FieldGroupProps,
  FieldLabelProps,
  FieldLegendProps,
  FieldProps,
  FieldSeparatorProps,
  FieldSetProps,
  FieldTitleProps,
} from "./field.types";
import { fieldVariants } from "./field.variants";

const FieldSet = ({ className, ...props }: FieldSetProps) => (
  <fieldset
    data-slot="field-set"
    className={cn(
      "flex flex-col gap-4",
      "has-[>[data-slot=checkbox-group]]:gap-3",
      "has-[>[data-slot=radio-group]]:gap-3",
      className,
    )}
    {...props}
  />
);

const FieldLegend = ({
  variant = FIELD_LEGEND_DEFAULTS.variant,
  className,
  ...props
}: FieldLegendProps) => (
  <legend
    data-slot="field-legend"
    data-variant={variant}
    className={cn(
      "mb-1.5 font-medium",
      "data-[variant=label]:text-sm",
      "data-[variant=legend]:text-base",
      className,
    )}
    {...props}
  />
);

const FieldGroup = ({ className, ...props }: FieldGroupProps) => (
  <div
    data-slot="field-group"
    className={cn(
      "group/field-group @container/field-group",
      "flex w-full flex-col gap-3",
      "data-[slot=checkbox-group]:gap-2",
      "*:data-slot=field-group]:gap-3",
      className,
    )}
    {...props}
  />
);

const Field = ({ orientation = FIELD_DEFAULTS.orientation, className, ...props }: FieldProps) => (
  // biome-ignore lint/a11y/useSemanticElements: single-control field wrapper, fieldset box model would break layout
  <div
    role="group"
    data-slot="field"
    data-orientation={orientation}
    className={cn(fieldVariants({ orientation }), className)}
    {...props}
  />
);

const FieldContent = ({ className, ...props }: FieldContentProps) => (
  <div
    data-slot="field-content"
    className={cn("group/field-content flex flex-1 flex-col gap-0.5 leading-snug", className)}
    {...props}
  />
);

const FieldLabel = ({ className, ...props }: FieldLabelProps) => (
  <Label
    data-slot="field-label"
    className={cn(
      "group/field-label peer/field-label",
      "flex w-fit gap-2 leading-snug",
      "group-data-[disabled=true]/field:opacity-50",
      // Cuando contiene un checkbox/radio con label card
      "has-data-checked:border-primary/30 has-data-checked:bg-primary/5",
      "dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10",
      // Cuando envuelve un field completo
      "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
      "has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border",
      "*:data-[slot=field]:p-2.5",
      className,
    )}
    {...props}
  />
);

const FieldTitle = ({ className, ...props }: FieldTitleProps) => (
  <div
    data-slot="field-label"
    className={cn(
      "flex w-fit items-center gap-2",
      "text-sm font-medium leading-snug",
      "group-data-[disabled=true]/field:opacity-50",
      className,
    )}
    {...props}
  />
);

const FieldDescription = ({ className, ...props }: FieldDescriptionProps) => (
  <p
    data-slot="field-description"
    className={cn(
      "text-left text-sm font-normal leading-normal text-muted-foreground",
      "group-has-data-horizontal/field:text-balance",
      "[[data-variant=legend]+&]:-mt-1.5",
      "last:mt-0 nth-last-2:-mt-1",
      "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
      className,
    )}
    {...props}
  />
);

const FieldSeparator = ({ className, children, ...props }: FieldSeparatorProps) => (
  <div
    data-slot="field-separator"
    data-content={!!children}
    className={cn(
      "relative -my-2 h-5 text-sm",
      "group-data-[variant=outline]/field-group:-mb-2",
      className,
    )}
    {...props}
  >
    <Separator className="absolute inset-0 top-1/2" />

    {children && (
      <span
        data-slot="field-separator-content"
        className="relative mx-auto block w-fit bg-background px-2 text-muted-foreground"
      >
        {children}
      </span>
    )}
  </div>
);

const FieldError = ({ errors, className, children, ...props }: FieldErrorProps) => {
  const content = useMemo(() => {
    if (children) return children;

    if (!errors?.length) return null;

    const unique = [...new Map(errors.map((e) => [e?.message, e])).values()].filter(Boolean);

    if (unique.length === 1) return unique[0]?.message;

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {unique.map((error, i) => error?.message && <li key={i}>{error.message}</li>)}
      </ul>
    );
  }, [children, errors]);

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn(
        "text-sm font-normal text-destructive transition-all duration-200",
        "min-h-5",
        content ? "opacity-100" : "opacity-0",
        className,
      )}
      {...props}
    >
      {content}
    </div>
  );
};

export {
  FieldSet,
  FieldLegend,
  FieldGroup,
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
  FieldDescription,
  FieldSeparator,
  FieldError,
};
