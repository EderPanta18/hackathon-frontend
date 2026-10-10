// src/ui/form/field/field.types.ts

import type { ComponentProps } from "react";
import type { LabelProps } from "@/ui/form/label";

interface FieldErrorItem {
  message?: string;
}

export type FieldOrientation = "vertical" | "horizontal" | "responsive";

export type FieldLegendVariant = "legend" | "label";

export interface FieldSetProps extends ComponentProps<"fieldset"> {}

export interface FieldLegendProps extends ComponentProps<"legend"> {
  variant?: FieldLegendVariant;
}

export interface FieldGroupProps extends ComponentProps<"div"> {}

export interface FieldProps extends ComponentProps<"div"> {
  orientation?: FieldOrientation;
}

export interface FieldContentProps extends ComponentProps<"div"> {}

export interface FieldLabelProps extends LabelProps {}

export interface FieldTitleProps extends ComponentProps<"div"> {}

export interface FieldDescriptionProps extends ComponentProps<"p"> {}

export interface FieldSeparatorProps extends ComponentProps<"div"> {}

export interface FieldErrorProps extends ComponentProps<"div"> {
  errors?: Array<FieldErrorItem | undefined>;
}
