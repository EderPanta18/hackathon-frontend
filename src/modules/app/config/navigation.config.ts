// src/modules/app/config/navigation.config.ts
//
import {
    Building2,
    HeartHandshake,
    Shield,
    Truck,
    type LucideIcon,
} from "lucide-react";
import { ROUTES } from "@/core/constants";
import { Role } from "@/core/enums";

export type AppNavItem = {
    readonly href: `/${string}`;
    readonly label: string;
    readonly Icon: LucideIcon;
    /**
     * Roles para los que esta entrada es visible.
     * No es una política de autorización: solo determina qué opciones
     * se presentan al usuario. La autorización de página vive en middleware
     * y la definitiva en NestJS.
     */
    readonly roles: readonly Role[];
    /**
     * Se admite jerarquía únicamente cuando exista una subruta confirmada.
     * Sin subrutas reales no se pobla.
     */
    readonly children?: readonly AppNavItem[];
};

/**
 * Navegación declarativa. Fuente única de opciones visibles.
 * Cada entrada apunta a rutas que ya existen en `ROUTES`.
 * No inventar subrutas ni acciones de negocio.
 */
export const APP_NAV_ITEMS: readonly AppNavItem[] = [
    {
        href: ROUTES.comuna.root,
        label: "Comuna",
        Icon: Building2,
        roles: [Role.COMUNA],
    },
    {
        href: ROUTES.ong.root,
        label: "ONG",
        Icon: HeartHandshake,
        roles: [Role.ONG],
    },
    {
        href: ROUTES.brigada.root,
        label: "Brigada",
        Icon: Truck,
        roles: [Role.BRIGADA],
    },
    {
        href: ROUTES.defensaCivil.root,
        label: "Defensa Civil",
        Icon: Shield,
        roles: [Role.DEFENSA_CIVIL],
    },
];

/** Filtra la navegación visible para el rol verificado. */
export function navItemsForRole(role: Role): readonly AppNavItem[] {
    return APP_NAV_ITEMS.filter((item) => item.roles.includes(role));
}
