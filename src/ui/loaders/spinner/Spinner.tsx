// src/ui/loaders/spinner/Spinner.tsx

import { cn } from "@/lib/styling";
import { SPINNER_DEFAULT_SR_LABEL, SPINNER_DEFAULTS } from "./spinner.constants";
import { getSpinnerSizeStyles } from "./spinner.helpers";
import type { SpinnerProps } from "./spinner.types";

export const Spinner = ({
  size = SPINNER_DEFAULTS.size,
  label,
  className,
  classNames,
  ...props
}: SpinnerProps) => {
  const sizeStyles = getSpinnerSizeStyles(size);

  return (
    // biome-ignore lint/a11y/useSemanticElements: spinner uses role="status" for live region, not output semantics
    <div
      role="status"
      aria-live="polite"
      data-slot="spinner"
      data-size={size}
      className={cn(
        "inline-flex w-fit max-w-full flex-col items-center justify-center",
        label && sizeStyles.gap,
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          "inline-block shrink-0 animate-spin rounded-full",
          "border-solid border-transparent border-t-current text-current",
          classNames?.track,
        )}
        style={{
          width: sizeStyles.indicator,
          height: sizeStyles.indicator,
          borderWidth: sizeStyles.stroke,
        }}
      />

      {label ? (
        <span
          className={cn(
            "text-center font-medium leading-none text-muted-foreground",
            sizeStyles.label,
            classNames?.label,
          )}
        >
          {label}
        </span>
      ) : (
        <span className="sr-only">{SPINNER_DEFAULT_SR_LABEL}</span>
      )}
    </div>
  );
};

export default Spinner;
