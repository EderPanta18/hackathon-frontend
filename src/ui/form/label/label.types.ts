// src/ui/form/label/label.types.ts

import type { Label as LabelPrimitive } from "radix-ui";
import type { ComponentProps } from "react";

export interface LabelProps extends ComponentProps<typeof LabelPrimitive.Root> {}
