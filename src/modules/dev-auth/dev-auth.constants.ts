// src/modules/dev-auth/dev-auth.constants.ts
//
import { Role } from "@/core/enums";

export const DEV_AUTH_COOKIE_MAX_AGE = 60 * 60 * 8; // 8 h

export const DEV_IDENTITIES = {
    [Role.COMUNA]: {
        sub: "dev-comuna",
        role: Role.COMUNA,
        name: "Usuario demo · Comuna",
    },
    [Role.ONG]: {
        sub: "dev-ong",
        role: Role.ONG,
        name: "Usuario demo · ONG",
    },
    [Role.BRIGADA]: {
        sub: "dev-brigada",
        role: Role.BRIGADA,
        name: "Usuario demo · Brigada",
    },
    [Role.DEFENSA_CIVIL]: {
        sub: "dev-defensa-civil",
        role: Role.DEFENSA_CIVIL,
        name: "Usuario demo · Defensa Civil",
    },
} as const satisfies Record<Role, { sub: string; role: Role; name: string }>;

export type DevIdentity = (typeof DEV_IDENTITIES)[Role];
