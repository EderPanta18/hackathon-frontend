// src/ui/composition/query-controls/filter/filter.types.ts

import type { ComponentProps, ReactNode } from "react";
import type {
  CollapsibleContentProps,
  CollapsibleProps,
  CollapsibleTriggerProps,
} from "@/ui/display/collapsible";
import type { ButtonProps } from "@/ui/primitives/button";

export interface FilterContextValue {
  values: string[];
  onChangeValues: (values: string[]) => void;
  multiple: boolean;
  toggleValue: (value: string) => void;
  clearValues: () => void;
  hasValues: boolean;
  disabled: boolean;
}

export interface FilterProps extends Omit<CollapsibleProps, "children"> {
  children: ReactNode;
  values: string[];
  onChangeValues: (values: string[]) => void;
  multiple?: boolean;
  disabled?: boolean;
}

export interface FilterHeaderProps extends ComponentProps<"div"> {}

export interface FilterTriggerProps extends CollapsibleTriggerProps {}

export interface FilterClearProps extends Omit<ButtonProps, "onClick"> {}

export interface FilterContentProps extends CollapsibleContentProps {}

export interface FilterOptionProps extends ComponentProps<"label"> {
  value: string;
  disabled?: boolean;
}
