// src/modules/app/components/app-shell.tsx
import type { ReactNode } from "react";
import type { Role } from "@/core/enums/user.enums";
import { Sidebar, SidebarProvider } from "@/ui/navigation/sidebar";
import { AppSidebar } from "./AppSidebar";
import { TooltipProvider } from "@/ui/overlay/tooltip";

type AppShellProps = {
    role: Role;
    children: ReactNode;
};

/**
 * Shell visual compartido por las cuatro familias de rutas.
 * No verifica JWT ni aplica autorización: recibe el rol ya verificado.
 */
export function AppShell({ role, children }: AppShellProps) {
    return (
        <TooltipProvider>
            <SidebarProvider>
                <AppSidebar role={role} />
                <Sidebar.Inset>
                    <header className="flex h-12 items-center gap-2 border-b px-3">
                        <Sidebar.Trigger />
                        <span className="text-sm text-muted-foreground">
                            Workspace
                        </span>
                    </header>
                    <div className="flex min-h-0 flex-1 flex-col overflow-auto p-4">
                        {children}
                    </div>
                </Sidebar.Inset>
            </SidebarProvider>
        </TooltipProvider>
    );
}
