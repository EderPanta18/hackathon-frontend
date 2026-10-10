// src/ui/navigation/sidebar/sidebar.context.ts

"use client";

import { createContext, useContext } from "react";
import type { SidebarContextProps } from "./sidebar.types";

export const SidebarContext = createContext<SidebarContextProps | null>(null);

export const useSidebar = (): SidebarContextProps => {
  const context = useContext(SidebarContext);

  if (!context) throw new Error("useSidebar debe usarse dentro de un SidebarProvider.");

  return context;
};
