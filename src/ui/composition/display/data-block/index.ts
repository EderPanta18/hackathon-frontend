// src/ui/composition/display/data-block/index.ts

import { DataBlockItem, DataBlock as DataBlockRoot } from "./DataBlock";

export const DataBlock = Object.assign(DataBlockRoot, {
  Item: DataBlockItem,
});
