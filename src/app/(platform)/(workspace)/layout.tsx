// src/app/(platform)/(workspace)/layout.tsx

export const instant = false;

import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { ROUTE_ACCESS_CONFIG } from "@/lib/config";
import { getServerSession } from "@/lib/server";
import { AppShell } from "@/modules/app/components";

type WorkspaceLayoutProps = { children: ReactNode };

/**
 * Shell visual compartido para las cuatro familias de roles.
 * No añade autenticación nueva: reutiliza la sesión ya verificada
 * (defensa en profundidad coherente con `(platform)/layout.tsx`).
 */
export default async function WorkspaceLayout({
    children,
}: WorkspaceLayoutProps) {
    const session = await getServerSession();

    // Defensa en profundidad: si por alguna vía se llega aquí sin sesión.
    if (!session) redirect(ROUTE_ACCESS_CONFIG.signInPath);

    return <AppShell role={session.role}>{children}</AppShell>;
}
