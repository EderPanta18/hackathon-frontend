"use client";

import { MapPinned } from "lucide-react";
import type { ReactNode } from "react";
import { DemoProvider, useDemo } from "../state/DemoProvider";
import styles from "./demo.module.css";

function Shell({ children }: { children: ReactNode }) {
  const { feedback } = useDemo();
  return (
    <div className={styles.root}>
      <a href="#demo-main" className={styles.skip}>
        Ir al contenido DEMO
      </a>
      <header className={styles.topbar}>
        <div className={styles.brand}>
          <span className={styles.brandIcon}>
            <MapPinned aria-hidden="true" />
          </span>
          <div>
            Piura Innova<p className={styles.muted}>Coordinación de ayuda humanitaria</p>
          </div>
        </div>
        <span className={styles.tag}>Reto 21 · DEMO</span>
      </header>
      <div className={styles.frame}>
        <aside className={styles.rail}>
          <strong>Explorar el escenario</strong>
          <p>Albergues, necesidades y recorrido de la ayuda en un único escenario ficticio.</p>
          <p>
            Piura · Perú
            <br />
            Revisión de experiencia
          </p>
        </aside>
        <main id="demo-main" tabIndex={-1} className={styles.main}>
          <div className={styles.notice}>
            <strong>DEMO · Datos ficticios</strong>Las acciones son simuladas. Los cambios se
            reinician al recargar o salir de la demostración.
          </div>
          <div
            role={feedback.error ? "alert" : "status"}
            aria-atomic="true"
            className={styles.feedback}
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
