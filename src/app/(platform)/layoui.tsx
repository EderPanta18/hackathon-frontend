// src/app/(platform)/layout.tsx

import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { ROUTE_ACCESS_CONFIG } from "@/lib/config";
import { getServerSession } from "@/lib/server";

type PlatformLayoutProps = { children: ReactNode };

/**
 * Segunda barrera de autenticación en servidor.
 * La restricción por rol vive exclusivamente en `src/middleware/*`.
 * El shell visual se monta en `(workspace)/layout.tsx`.
 */
export default async function PlatformLayout({
    children,
}: PlatformLayoutProps) {
    const session = await getServerSession();

    if (!session) {
        const signInPath = ROUTE_ACCESS_CONFIG.signInPath;

        if (!signInPath)
            throw new Error(
                "Configura ROUTE_ACCESS_CONFIG.signInPath antes de habilitar rutas protegidas",
            );

        redirect(signInPath);
    }

    return children;
}
