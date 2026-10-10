"use client";

import dynamic from "next/dynamic";
import { useId, useState } from "react";
import { Card } from "@/ui/display/card";
import { Table } from "@/ui/display/table";
import { Dialog } from "@/ui/overlay/dialog";
import { Button } from "@/ui/primitives/button";
import type { DemoMapData } from "../data/demo.geojson";
import type { DemoScenario, Dispatch, DispatchStatus } from "../data/demo.types";

const PiuraMap = dynamic(() => import("./DemoMap"), {
  ssr: false,
  loading: () => <div className="demo-map">Preparando recorrido ilustrativo…</div>,
});
export const statusLabel: Record<DispatchStatus, string> = {
  preparado: "Preparado DEMO",
  en_transito: "En tránsito DEMO",
  recibido: "Recibido DEMO",
};
export function DispatchDetail({
  dispatch,
  origin,
  destination,
  vehicle,
  items,
  status,
  mapData,
  onReceive,
}: {
  dispatch: Dispatch;
  origin: string;
  destination: string;
  vehicle: DemoScenario["vehicles"][number];
  items: DemoScenario["items"];
  status: DispatchStatus;
  mapData: DemoMapData;
  onReceive: () => void;
}) {
  const [open, setOpen] = useState(false);
  const reasonId = useId();
  const canReceive = status === "en_transito";
  const step = ["preparado", "en_transito", "recibido"].indexOf(status);
  return (
    <Card>
      <Card.Header>
        <div className="demo-row">
          <span className="demo-tag">{dispatch.id}</span>
          <span className="demo-tag">{statusLabel[status]}</span>
        </div>
        <Card.Title>
          <h2>
            {origin} a {destination}
          </h2>
        </Card.Title>
        <Card.Description>
          Despacho de ejemplo independiente. Reservar en asignaciones no cambia esta carga.
        </Card.Description>
      </Card.Header>
      <Card.Content className="demo-stack">
        <ol className="demo-timeline" aria-label="Estados del despacho">
          {(["preparado", "en_transito", "recibido"] as const).map((value, i) => (
            <li
              key={value}
              data-complete={i <= step}
              aria-current={status === value ? "step" : undefined}
            >
              <span>{i + 1}</span>
              {statusLabel[value]}
            </li>
          ))}
        </ol>
        <dl className="demo-routeFacts">
          <div>
            <dt>Origen</dt>
            <dd>{origin}</dd>
          </div>
          <div>
            <dt>Destino</dt>
            <dd>{destination}</dd>
          </div>
          <div>
            <dt>Vehículo registrado ficticio</dt>
            <dd>
              {vehicle.label} · {vehicle.demoRegistration}
            </dd>
          </div>
        </dl>
        <div className="demo-tableScroll">
          <Table>
            <Table.Caption>Carga del despacho DEMO</Table.Caption>
            <Table.Header>
              <Table.Row>
                <Table.Head>Insumo</Table.Head>
                <Table.Head>Unidad</Table.Head>
                <Table.Head>Cantidad</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {dispatch.lines.map((l) => (
                <Table.Row key={l.itemId}>
                  <Table.Cell>{items.find((i) => i.id === l.itemId)?.label}</Table.Cell>
                  <Table.Cell>{items.find((i) => i.id === l.itemId)?.unit}</Table.Cell>
                  <Table.Cell>{l.quantity}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        <div className="demo-notice">
          <strong>Ruta ilustrativa, no verificada</strong>Acceso del escenario:{" "}
          {dispatch.routeAccess === "bloqueado" ? "bloqueado" : "desconocido"}. La línea no indica
          una ruta segura, calculada ni transitable.
        </div>
        <PiuraMap data={mapData} />
        <p id={reasonId} className="demo-muted">
          {canReceive
            ? "Puedes simular la recepción una vez. No hay firma ni confirmación operativa; no se descuenta stock del origen nuevamente."
            : status === "preparado"
              ? "No se puede recibir: el ejemplo todavía está preparado y no ha salido. La demo no permite despacharlo."
              : "Este ejemplo ya figura recibido DEMO. No se puede duplicar la recepción."}
        </p>
        <Dialog open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <Button disabled={!canReceive} aria-describedby={reasonId}>
              {status === "recibido" ? "Recepción DEMO registrada" : "Simular recepción"}
            </Button>
          </Dialog.Trigger>
          <Dialog.Content className="demo-dialog">
            <Dialog.Header>
              <Dialog.Title>Confirmar recepción simulada</Dialog.Title>
              <Dialog.Description>
                DEMO · {dispatch.id}. Confirmar muestra como recibida la carga de {destination}, sin
                entrega ni firma real. Los cambios se reinician al recargar.
              </Dialog.Description>
            </Dialog.Header>
            <ul>
              {dispatch.lines.map((l) => (
                <li key={l.itemId}>
                  {l.quantity} {items.find((i) => i.id === l.itemId)?.unit} de{" "}
                  {items.find((i) => i.id === l.itemId)?.label}
                </li>
              ))}
            </ul>
            <Dialog.Footer>
              <Dialog.Close asChild>
                <Button variant="outline" tone="neutral">
                  Cancelar
                </Button>
              </Dialog.Close>
              <Button
                onClick={() => {
                  onReceive();
                  setOpen(false);
                }}
              >
                Confirmar recepción DEMO
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog>
      </Card.Content>
    </Card>
  );
}
