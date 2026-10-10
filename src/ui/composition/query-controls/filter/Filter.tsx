// src/ui/composition/query-controls/filter/Filter.tsx

"use client";

import { ChevronDown } from "lucide-react";
import { useCallback, useMemo } from "react";
import { cn } from "@/lib/styling";
import { Collapsible } from "@/ui/display/collapsible";
import { Checkbox } from "@/ui/form/checkbox";
import { Button } from "@/ui/primitives/button";
import { FILTER_DEFAULTS, FILTER_OPTION_DEFAULTS } from "./filter.constants";
import { FilterContext, useFilter } from "./filter.context";
import type {
  FilterClearProps,
  FilterContentProps,
  FilterHeaderProps,
  FilterOptionProps,
  FilterProps,
  FilterTriggerProps,
} from "./filter.types";
import { filterOptionVariants } from "./filter.variants";

const Filter = ({
  multiple = FILTER_DEFAULTS.multiple,
  defaultOpen = FILTER_DEFAULTS.defaultOpen,
  disabled = FILTER_DEFAULTS.disabled,
  values,
  onChangeValues,
  className,
  children,
  ...props
}: FilterProps) => {
  const toggleValue = useCallback(
    (value: string) => {
      if (disabled) return;

      if (!multiple) {
        onChangeValues(values.includes(value) ? [] : [value]);

        return;
      }

      onChangeValues(
        values.includes(value) ? values.filter((v) => v !== value) : [...values, value],
      );
    },
    [disabled, multiple, values, onChangeValues],
  );

  const clearValues = useCallback(() => {
    if (disabled) return;

    onChangeValues([]);
  }, [disabled, onChangeValues]);

  const contextValue = useMemo(
    () => ({
      values,
      onChangeValues,
      multiple,
      disabled,
      toggleValue,
      clearValues,
      hasValues: values.length > 0,
    }),
    [values, onChangeValues, multiple, disabled, toggleValue, clearValues],
  );

  return (
    <FilterContext.Provider value={contextValue}>
      <Collapsible
        data-slot="filter"
        defaultOpen={defaultOpen}
        disabled={disabled}
        className={cn("group/filter w-full rounded-xl border", disabled && "opacity-60", className)}
        {...props}
      >
        {children}
      </Collapsible>
    </FilterContext.Provider>
  );
};

const FilterHeader = ({ className, ...props }: FilterHeaderProps) => (
  <div
    data-slot="filter-header"
    className={cn(
      "sticky top-0 z-10 flex items-center justify-between gap-2 overflow-hidden",
      "rounded-t-xl  px-3 py-2",
      "group-data-[state=open]/filter:rounded-b-none",
      "group-data-[state=open]/filter:border-b",
      className,
    )}
    {...props}
  />
);

const FilterTrigger = ({ className, children, ...props }: FilterTriggerProps) => (
  <Collapsible.Trigger
    data-slot="filter-trigger"
    className={cn(
      "group/trigger flex flex-1 cursor-pointer items-center justify-between gap-2",
      "text-left text-sm font-medium text-foreground",
      "disabled:pointer-events-none",
      className,
    )}
    {...props}
  >
    <span>{children}</span>
    <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]/trigger:rotate-180" />
  </Collapsible.Trigger>
);

const FilterClear = ({ className, children, ...props }: FilterClearProps) => {
  const { clearValues, hasValues, disabled } = useFilter();

  return (
    <Button
      type="button"
      size="xs"
      tone="neutral"
      variant="ghost"
      disabled={disabled || !hasValues}
      onClick={clearValues}
      className={className}
      {...props}
    >
      {children ?? "Limpiar"}
    </Button>
  );
};

const FilterContent = ({ className, ...props }: FilterContentProps) => (
  <Collapsible.Content
    data-slot="filter-content"
    className={cn("flex flex-col gap-0.5 px-2 pb-2 pt-1", className)}
    {...props}
  />
);

const FilterOption = ({
  disabled: optionDisabled = FILTER_OPTION_DEFAULTS.disabled,
  value,
  className,
  children,
  ...props
}: FilterOptionProps) => {
  const { values, toggleValue, disabled: groupDisabled } = useFilter();

  const isDisabled = groupDisabled || optionDisabled;

  const checked = values.includes(value);

  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: Checkbox inside label acts as the control
    <label
      data-slot="filter-option"
      data-disabled={isDisabled || undefined}
      className={cn(filterOptionVariants({ disabled: isDisabled }), className)}
      {...props}
    >
      <Checkbox
        checked={checked}
        onCheckedChange={isDisabled ? undefined : () => toggleValue(value)}
        size="sm"
        tone="primary"
        disabled={isDisabled}
      />
      <span className="flex-1">{children}</span>
    </label>
  );
};

export { Filter, FilterHeader, FilterTrigger, FilterClear, FilterContent, FilterOption };
