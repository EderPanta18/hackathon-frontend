// src/ui/primitives/avatar/avatar.types.ts

import type { Avatar as AvatarPrimitive } from "radix-ui";
import type { ComponentProps } from "react";

export type AvatarSize = "sm" | "md" | "lg";

type NativeAvatarProps = ComponentProps<typeof AvatarPrimitive.Root>;

export interface AvatarProps extends NativeAvatarProps {
  size?: AvatarSize;
}

export interface AvatarImageProps extends ComponentProps<typeof AvatarPrimitive.Image> {}

export interface AvatarFallbackProps extends ComponentProps<typeof AvatarPrimitive.Fallback> {}

export interface AvatarBadgeProps extends ComponentProps<"span"> {}

export interface AvatarGroupProps extends ComponentProps<"div"> {}

export interface AvatarGroupCountProps extends ComponentProps<"div"> {}
