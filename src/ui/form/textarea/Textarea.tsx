// src/ui/form/textarea/Textarea.tsx

import { forwardRef } from "react";
import { cn } from "@/lib/styling";
import { TEXTAREA_DEFAULTS } from "./textarea.constants";
import type { TextareaProps } from "./textarea.types";
import { textareaVariants } from "./textarea.variants";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { variant = TEXTAREA_DEFAULTS.variant, className, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      data-slot="textarea"
      className={cn(textareaVariants({ variant }), className)}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export default Textarea;
