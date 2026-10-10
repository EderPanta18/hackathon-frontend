"use client";

import { useMemo, useState } from "react";
import { Button } from "@/ui/primitives/button";
import { DispatchDetail, statusLabel } from "../components/DispatchDetail";
import { demoScenario as s } from "../data/demo.fixtures";
import { geojsonFor } from "../data/demo.geojson";
import { dispatchStatus } from "../data/demo.selectors";
import { useDemo } from "../state/DemoProvider";

export function DemoDispatches({ reference }: { reference?: string }) {
  const { state, act } = useDemo();
  const invalid = Boolean(reference && !s.dispatches.some((x) => x.id === reference));
  const [selected, setSelected] = useState(!invalid && reference ? reference : s.defaultDispatchId);
  const d = s.dispatches.find((x) => x.id === selected);
  const mapData = useMemo(() => geojsonFor("", "", selected), [selected]);
  const origin = s.warehouses.find((x) => x.id === d?.warehouseId);
  const destination = s.shelters.find((x) => x.id === d?.shelterId);
  const vehicle = s.vehicles.find((x) => x.id === d?.vehicleId);
  if (!d || !origin || !destination || !vehicle) return null;
  return (
    <>
      <div className="demo-pageHeader">
        <div>
          <h1>Despachos de ejemplo</h1>
          <p className="demo-muted">Recorre origen, carga y recepción de una entrega simulada.</p>
        </div>
        <span className="demo-tag">DEMO · Ejemplos independientes</span>
      </div>
      {invalid && (
        <div className="demo-notice" role="alert">
          Referencia DEMO no encontrada. Se muestra {s.defaultDispatchId}; puedes elegir otro
          ejemplo.
        </div>
      )}
      <div className="demo-dispatchGrid">
        <section aria-label="Seleccionar despacho" className="demo-stack">
          <h2 className="demo-subheading">3 despachos ficticios</h2>
          {s.dispatches.map((x) => (
            <Button
              key={x.id}
              variant="ghost"
              tone="neutral"
              className="demo-dispatchButton"
              aria-pressed={selected === x.id}
              onClick={() => setSelected(x.id)}
            >
              <strong>{x.id}</strong>
              <span>{s.shelters.find((a) => a.id === x.shelterId)?.name}</span>
              <span className="demo-tag">{statusLabel[dispatchStatus(x, state)]}</span>
            </Button>
          ))}
          <p className="demo-muted">
            {reference ? "Referencia solicitada" : "Ejemplo inicial"}: {d.id}. Las cargas ya están
            contabilizadas en el inventario inicial.
          </p>
        </section>
        <DispatchDetail
          key={d.id}
          dispatch={d}
          origin={origin.name}
          destination={destination.name}
          vehicle={vehicle}
          items={s.items}
          status={dispatchStatus(d, state)}
          mapData={mapData}
          onReceive={() => act({ type: "receive", dispatchId: d.id })}
        />
      </div>
    </>
  );
}
