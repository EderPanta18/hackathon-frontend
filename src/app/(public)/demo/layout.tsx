import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DemoShell } from "@/modules/demo";

export const metadata: Metadata = {
  title: { default: "Piura Innova · DEMO", template: "%s · DEMO Piura Innova" },
  description: "Prototipo visual con datos ficticios del Reto 21.",
};
export default function DemoLayout({ children }: { children: ReactNode }) {
  return <DemoShell>{children}</DemoShell>;
}
