// src/ui/composition/query-controls/search-input/SearchInput.tsx

"use client";

import { SearchIcon, XIcon } from "lucide-react";
import { type ChangeEventHandler, forwardRef, useEffect, useState } from "react";
import { cn } from "@/lib/styling";
import { Input } from "@/ui/form/input";
import { Button } from "@/ui/primitives/button";
import { SEARCH_INPUT_CLEAR_SIZE, SEARCH_INPUT_DEFAULTS } from "./search-input.constants";
import type { SearchInputProps } from "./search-input.types";
import { searchIconVariants, searchInputPaddingVariants } from "./search-input.variants";

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  {
    size = SEARCH_INPUT_DEFAULTS.size,
    placeholder = SEARCH_INPUT_DEFAULTS.placeholder,
    showSearchIcon = SEARCH_INPUT_DEFAULTS.showSearchIcon,
    showClearButton = SEARCH_INPUT_DEFAULTS.showClearButton,
    debounceMs = SEARCH_INPUT_DEFAULTS.debounceMs,
    disabled = SEARCH_INPUT_DEFAULTS.disabled,
    value,
    onChangeValue,
    className,
    ...props
  },
  ref,
) {
  const [internal, setInternal] = useState(value);

  useEffect(() => {
    setInternal(value);
  }, [value]);

  useEffect(() => {
    if (!debounceMs) return;

    const handle = setTimeout(() => {
      if (internal !== value) onChangeValue(internal);
    }, debounceMs);

    return () => clearTimeout(handle);
  }, [debounceMs, internal, onChangeValue, value]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const next = e.target.value;
    setInternal(next);

    if (!debounceMs) onChangeValue(next);
  };

  const handleClear = () => {
    setInternal("");
    onChangeValue("");
  };

  const hasValue = internal.trim().length > 0;
  const showClear = showClearButton && hasValue && !disabled;

  return (
    <div data-slot="search-input" className="relative w-full">
      {showSearchIcon && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5"
        >
          <SearchIcon className={searchIconVariants({ size })} />
        </span>
      )}

      <Input
        ref={ref}
        value={internal}
        onChange={handleChange}
        placeholder={placeholder}
        size={size}
        disabled={disabled}
        className={cn(
          searchInputPaddingVariants({
            size,
            hasLeft: showSearchIcon,
            hasRight: showClearButton,
          }),
          className,
        )}
        {...props}
      />

      {showClear && (
        <span className="absolute inset-y-0 right-0 flex items-center pr-0.5">
          <Button
            type="button"
            size={SEARCH_INPUT_CLEAR_SIZE[size]}
            tone="neutral"
            variant="ghost"
            aria-label="Limpiar búsqueda"
            onClick={handleClear}
          >
            <XIcon />
          </Button>
        </span>
      )}
    </div>
  );
});

SearchInput.displayName = "SearchInput";

export default SearchInput;
