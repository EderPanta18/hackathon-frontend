"use client";

import type { ReactNode } from "react";
import { Toaster } from "@/ui/feedback/sonner";
import QueryProvider from "./QueryProvider";
import ThemeProvider from "./ThemeProvider";

interface AppProvidersProps {
    children: ReactNode;
}

/** Infraestructura compartida de React; no valida sesiones ni autoriza rutas. */
export function AppProviders({ children }: AppProvidersProps) {
    return (
        <QueryProvider>
            {children}
            <Toaster position="top-right" />
        </QueryProvider>
    );
}
