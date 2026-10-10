// src/ui/form/textarea/textarea.types.ts

import type { TextareaHTMLAttributes } from "react";

export type TextareaVariant = "outline" | "underline";

type NativeTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export interface TextareaProps extends NativeTextareaProps {
  variant?: TextareaVariant;
}
