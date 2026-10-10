// src/ui/primitives/kbd/index.ts

import { KbdGroup, Kbd as KbdRoot } from "./Kbd";

export const Kbd = Object.assign(KbdRoot, {
  Group: KbdGroup,
});

export type { KbdGroupProps, KbdProps } from "./kbd.types";
