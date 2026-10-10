// src/ui/loaders/progress/progress.types.ts

import type { Progress as ProgressPrimitive } from "radix-ui";
import type { ComponentProps } from "react";

type NativeProgressProps = ComponentProps<typeof ProgressPrimitive.Root>;

export interface ProgressProps extends NativeProgressProps {}
