// src/ui/form/input-group/index.ts

import {
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroup as InputGroupRoot,
  InputGroupText,
  InputGroupTextarea,
} from "./InputGroup";

export const InputGroup = Object.assign(InputGroupRoot, {
  Addon: InputGroupAddon,
  Button: InputGroupButton,
  Text: InputGroupText,
  Input: InputGroupInput,
  Textarea: InputGroupTextarea,
});

export type {
  InputGroupAddonProps,
  InputGroupButtonProps,
  InputGroupInputProps,
  InputGroupProps,
  InputGroupTextareaProps,
  InputGroupTextProps,
} from "./input-group.types";
