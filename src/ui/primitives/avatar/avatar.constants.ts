// src/ui/primitives/avatar/avatar.constants.ts

import type { AvatarProps } from "./avatar.types";

export const AVATAR_DEFAULTS = {
  size: "md",
} as const satisfies Required<Pick<AvatarProps, "size">>;
