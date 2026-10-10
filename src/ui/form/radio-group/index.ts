// src/ui/form/radio-group/index.ts

import { RadioGroupItem, RadioGroup as RadioGroupRoot } from "./RadioGroup";

export const RadioGroup = Object.assign(RadioGroupRoot, {
  Item: RadioGroupItem,
});

export type { RadioGroupItemProps, RadioGroupProps } from "./radio-group.types";
