// src/ui/composition/display/data-block/DataBlock.tsx

import { cn } from "@/lib/styling";
import { DATA_BLOCK_DEFAULTS } from "./data-block.constants";
import type { DataBlockItemProps, DataBlockProps } from "./data-block.types";
import {
  dataBlockGridVariants,
  dataBlockValueVariants,
  dataBlockVariants,
} from "./data-block.variants";

const DataBlock = ({
  size = DATA_BLOCK_DEFAULTS.size,
  className,
  children,
  ...props
}: DataBlockProps) => (
  <div
    data-slot="data-block"
    data-size={size}
    className={cn(dataBlockVariants({ size }), className)}
    {...props}
  >
    <dl className={dataBlockGridVariants({ size })}>{children}</dl>
  </div>
);

const DataBlockItem = ({ label, value, muted, highlight }: DataBlockItemProps) => {
  const variant = highlight ? "highlight" : muted ? "muted" : "default";

  return (
    <div
      data-slot="data-block-item"
      data-muted={muted || undefined}
      data-highlight={highlight || undefined}
      className="contents"
    >
      <dt
        data-slot="data-block-label"
        className="text-sm font-semibold text-muted-foreground group-data-[size=sm]/data-block:text-xs"
      >
        {label}:
      </dt>
      <dd data-slot="data-block-value" className={dataBlockValueVariants({ variant })}>
        {value}
      </dd>
    </div>
  );
};

export { DataBlock, DataBlockItem };
