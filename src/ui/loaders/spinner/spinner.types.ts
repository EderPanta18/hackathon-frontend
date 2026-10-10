// src/ui/loaders/spinner/spinner.types.ts

import type { HTMLAttributes, ReactNode } from "react";

export type SpinnerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "5xl";

type NativeDivProps = Omit<HTMLAttributes<HTMLDivElement>, "children">;

export interface SpinnerClassNames {
  track?: string;
  label?: string;
}

export interface SpinnerProps extends NativeDivProps {
  size?: SpinnerSize;
  label?: ReactNode;
  classNames?: SpinnerClassNames;
}
