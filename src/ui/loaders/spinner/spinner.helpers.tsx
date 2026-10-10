// src/ui/loaders/spinner/spinner.helpers.tsx

import { SPINNER_SIZE_STYLES } from "./spinner.constants";
import type { SpinnerSize } from "./spinner.types";

export const getSpinnerSizeStyles = (size: SpinnerSize) => SPINNER_SIZE_STYLES[size];
