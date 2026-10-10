"use client";
import "./demo.css";

import { MapPinned } from "lucide-react";
import type { ReactNode } from "react";
import { DemoProvider, useDemo } from "../state/DemoProvider";

function Shell({ children }: { children: ReactNode }) {
  const { feedback } = useDemo();
  return (
    <div className={"demo-root"}>
      <a href="#demo-main" className={"demo-skip"}>
        Ir al contenido DEMO
      </a>
      <header className={"demo-topbar"}>
        <div className={"demo-brand"}>
          <span className={"demo-brandIcon"}>
            <MapPinned aria-hidden="true" />
          </span>
          <div>
            Piura Innova<p className={"demo-muted"}>Coordinación de ayuda humanitaria</p>
          </div>
        </div>
        <span className={"demo-tag"}>Reto 21 · DEMO</span>
      </header>
      <div className={"demo-frame"}>
        <aside className={"demo-rail"}>
          <strong>Explorar el escenario</strong>
          <p>Albergues, necesidades y recorrido de la ayuda en un único escenario ficticio.</p>
          <p>
            Piura · Perú
            <br />
            Revisión de experiencia
          </p>
        </aside>
        <main id="demo-main" tabIndex={-1} className={"demo-main"}>
          <div className={"demo-notice"}>
            <strong>DEMO · Datos ficticios</strong>Las acciones son simuladas. Los cambios se
            reinician al recargar o salir de la demostración.
          </div>
          <div
            role={feedback.error ? "alert" : "status"}
            aria-atomic="true"
            className={"demo-feedback"}
          >
            {feedback.text}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
export function DemoShell({ children }: { children: ReactNode }) {
  return (
    <DemoProvider>
      <Shell>{children}</Shell>
    </DemoProvider>
  );
}
