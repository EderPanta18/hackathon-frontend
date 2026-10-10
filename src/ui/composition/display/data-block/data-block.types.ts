// src/ui/composition/display/data-block/data-block.types.ts

import type { ComponentProps, ReactNode } from "react";

export type DataBlockSize = "sm" | "md";

export interface DataBlockProps extends ComponentProps<"div"> {
  size?: DataBlockSize;
}

export interface DataBlockItemProps {
  label: string;
  value: ReactNode;
  muted?: boolean;
  highlight?: boolean;
}
