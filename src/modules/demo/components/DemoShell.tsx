"use client";
import "./demo.css";

import { Boxes, LayoutDashboard, MapPinned, Truck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useState } from "react";
import { Button } from "@/ui/primitives/button";
import { DemoProvider, useDemo } from "../state/DemoProvider";

function Shell({ children }: { children: ReactNode }) {
  const { feedback, state, act } = useDemo();
  const [showQueue, setShowQueue] = useState(false);
  const pathname = usePathname();
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
        <div className="demo-row">
          <span className={"demo-tag"}>Reto 21 · DEMO</span>
          <Button
            variant="outline"
            tone="neutral"
            onClick={() => {
              setShowQueue(false);
              act({
                type: "connection",
                mode: state.connectionMode === "online" ? "offline" : "online",
              });
            }}
          >
            {state.connectionMode === "online" ? "Simular sin conexión" : "Volver a online DEMO"}
          </Button>
        </div>
      </header>
      <div className={"demo-frame"}>
        <aside className={"demo-rail"}>
          <strong>Explorar el escenario</strong>
          <nav aria-label="Navegación DEMO" className="demo-nav">
            {[
              { href: "/demo", label: "Mapa de albergues", Icon: LayoutDashboard },
              { href: "/demo/asignaciones", label: "Asignaciones", Icon: Boxes },
              { href: "/demo/despachos", label: "Despachos", Icon: Truck },
            ].map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                aria-current={
                  pathname === href ||
                  (href === "/demo/despachos" && pathname.startsWith("/demo/documentos/"))
                    ? "page"
                    : undefined
                }
              >
                <Icon aria-hidden="true" size={18} />
                {label}
              </Link>
            ))}
          </nav>
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
          {state.connectionMode === "offline" && (
            <section className="demo-offline" aria-label="Conectividad offline simulada">
              <h2>Sin conexión DEMO</h2>
              <p>
                Es una demostración visual. El mapa puede seguir usando red y las simulaciones
                locales continúan.
              </p>
              <Button
                variant="outline"
                tone="neutral"
                disabled={showQueue}
                aria-describedby="demo-queue-note"
                onClick={() => setShowQueue(true)}
              >
                Simular confirmación offline
              </Button>
              <output className="demo-queueRow" aria-live="polite">
                {showQueue ? (
                  <>
                    <strong>Confirmación ilustrativa · Pendiente DEMO</strong>
                    <span>Fila ficticia de una maqueta de cola.</span>
                  </>
                ) : (
                  "Pulsa para ver un ejemplo de cola pendiente."
                )}
              </output>
              <p id="demo-queue-note">
                No contiene operaciones realizadas, no guarda cambios ni se procesa al volver
                online. Mostrar el ejemplo no modifica reservas, despachos o recepciones.
              </p>
            </section>
          )}
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
