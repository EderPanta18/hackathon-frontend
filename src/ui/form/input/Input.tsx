// src/ui/form/input/Input.tsx

import { forwardRef } from "react";
import { cn } from "@/lib/styling";
import { INPUT_DEFAULTS } from "./input.constants";
import type { InputProps } from "./input.types";
import { inputVariants } from "./input.variants";

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { size = INPUT_DEFAULTS.size, variant = INPUT_DEFAULTS.variant, className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      data-slot="input"
      className={cn(inputVariants({ variant, size }), className)}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;
