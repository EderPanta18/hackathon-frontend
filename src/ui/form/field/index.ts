// src/ui/form/field/index.ts

import {
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  Field as FieldRoot,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "./Field";

export const Field = Object.assign(FieldRoot, {
  Set: FieldSet,
  Legend: FieldLegend,
  Group: FieldGroup,
  Content: FieldContent,
  Label: FieldLabel,
  Title: FieldTitle,
  Description: FieldDescription,
  Separator: FieldSeparator,
  Error: FieldError,
});

export type {
  FieldContentProps,
  FieldDescriptionProps,
  FieldErrorProps,
  FieldGroupProps,
  FieldLabelProps,
  FieldLegendProps,
  FieldSeparatorProps,
  FieldSetProps,
  FieldTitleProps,
} from "./field.types";
