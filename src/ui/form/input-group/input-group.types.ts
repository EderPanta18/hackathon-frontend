// src/ui/form/input-group/input-group.types.ts

import type { ComponentProps } from "react";
import type { InputProps } from "@/ui/form/input";
import type { TextareaProps } from "@/ui/form/textarea";
import type { ButtonProps } from "@/ui/primitives/button";

export type InputGroupButtonSize = "xs" | "sm" | "icon-xs" | "icon-sm";

export type InputGroupAddonAlign = "inline-start" | "inline-end" | "block-start" | "block-end";

export interface InputGroupProps extends ComponentProps<"div"> {}

export interface InputGroupAddonProps extends ComponentProps<"div"> {
  align?: InputGroupAddonAlign;
}

export interface InputGroupButtonProps extends Omit<ButtonProps, "size"> {
  size?: InputGroupButtonSize;
}

export interface InputGroupTextProps extends ComponentProps<"span"> {}

export interface InputGroupInputProps extends InputProps {}

export interface InputGroupTextareaProps extends TextareaProps {}
