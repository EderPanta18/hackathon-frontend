// src/ui/primitives/toggle-group/index.ts

import { ToggleGroupItem, ToggleGroup as ToggleGroupRoot } from "./ToggleGroup";

export const ToggleGroup = Object.assign(ToggleGroupRoot, {
  Item: ToggleGroupItem,
});

export type {
  ToggleGroupItemProps,
  ToggleGroupProps,
} from "./toggle-group.types";
