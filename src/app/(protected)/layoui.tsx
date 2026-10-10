import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { ROUTE_ACCESS_CONFIG } from "@/lib/config";
import { getServerSession } from "@/lib/server";

type ProtectedLayoutProps = {
    children: ReactNode;
};

/** Segunda barrera de acceso en servidor; proxy.ts solo hace el filtro previo. */
export default async function ProtectedLayout({
    children,
}: ProtectedLayoutProps) {
    const session = await getServerSession();

    if (!session) {
        const signInPath = ROUTE_ACCESS_CONFIG.signInPath;

        if (!signInPath)
            // Fallar cerrado: no se ha configurado aun una ruta publica de login.
            throw new Error(
                "Configura ROUTE_ACCESS_CONFIG.signInPath antes de habilitar rutas protegidas",
            );

        redirect(signInPath);
    }

    return children;
}
