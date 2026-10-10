// src/ui/primitives/aspect-ratio/AspectRatio.tsx

import { AspectRatio as AspectRatioPrimitive } from "radix-ui";
import type { AspectRatioProps } from "./aspect-ratio.types";

export const AspectRatio = ({ ...props }: AspectRatioProps) => (
  <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />
);

export default AspectRatio;
