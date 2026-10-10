// src/ui/form/input/input.types.ts

import type { InputHTMLAttributes, ReactNode } from "react";

export type InputSize = "sm" | "md" | "lg";

export type InputVariant = "outline" | "underline";

type NativeInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size">;

export interface InputProps extends NativeInputProps {
  size?: InputSize;
  variant?: InputVariant;
  icon?: ReactNode;
}
