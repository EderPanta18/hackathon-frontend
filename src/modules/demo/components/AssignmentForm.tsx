"use client";

import { useId, useState } from "react";
import { Card } from "@/ui/display/card";
import { Table } from "@/ui/display/table";
import { Dialog } from "@/ui/overlay/dialog";
import { Button } from "@/ui/primitives/button";
import type { proposalFor } from "../data/demo.selectors";
import type { CargoLine, DemoScenario } from "../data/demo.types";

export function AssignmentForm({
  summary,
  items,
  onReserve,
}: {
  summary: NonNullable<ReturnType<typeof proposalFor>>;
  items: DemoScenario["items"];
  onReserve: (lines: readonly CargoLine[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [shownLines, setShownLines] = useState<readonly CargoLine[]>([]);
  const reasonId = useId();
  const canReserve = !summary.reserved && summary.lines.some((x) => x.quantity > 0);
  return (
    <Card>
      <Card.Header>
        <Card.Title>
          <h2>Propuesta de asignación DEMO</h2>
        </Card.Title>
        <Card.Description>
          {summary.proposal.id} · cantidades predefinidas limitadas por stock y demanda
        </Card.Description>
      </Card.Header>
      <Card.Content className="demo-stack">
        <div className="demo-tableScroll">
          <Table className="demo-wideTable">
            <Table.Caption>
              Necesidades y propuesta por insumo; no se suman unidades distintas
            </Table.Caption>
            <Table.Header>
              <Table.Row>
                {[
                  "Insumo / unidad",
                  "Demanda",
                  "Pendiente de recibir",
                  "Comprometido",
                  "Por cubrir",
                  "Disponible",
                  "Atendible",
                  "Faltante tras propuesta",
                ].map((h) => (
                  <Table.Head key={h}>{h}</Table.Head>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {summary.lines.map((l) => {
                const item = items.find((i) => i.id === l.itemId);
                return (
                  <Table.Row key={l.itemId}>
                    <Table.Cell>
                      {item?.label}
                      <small className="demo-unit">{item?.unit}</small>
                    </Table.Cell>
                    <Table.Cell>{l.required}</Table.Cell>
                    <Table.Cell>{l.pendingReceipt}</Table.Cell>
                    <Table.Cell>{l.committed}</Table.Cell>
                    <Table.Cell>{l.uncovered}</Table.Cell>
                    <Table.Cell>{l.available}</Table.Cell>
                    <Table.Cell>
                      <strong>{l.quantity}</strong>
                    </Table.Cell>
                    <Table.Cell>{l.shortfall}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
        <p className="demo-muted" id={reasonId}>
          {summary.reserved
            ? "Reserva simulada aplicada. No se puede duplicar. El faltante muestra lo que sigue sin compromiso."
            : canReserve
              ? "La reserva puede ser parcial. Los insumos sin stock permanecen como faltantes. No genera un despacho ni confirma una entrega."
              : "Sin cantidad atendible: no hay stock o la necesidad ya está comprometida."}
        </p>
        <Dialog
          open={open}
          onOpenChange={(value) => {
            if (value)
              setShownLines(
                summary.lines
                  .filter((l) => l.quantity > 0)
                  .map(({ itemId, quantity }) => ({ itemId, quantity })),
              );
            setOpen(value);
          }}
        >
          <Dialog.Trigger asChild>
            <Button disabled={!canReserve} aria-describedby={reasonId}>
              {summary.reserved ? "Reserva DEMO aplicada" : "Simular reserva"}
            </Button>
          </Dialog.Trigger>
          <Dialog.Content className="demo-dialog">
            <Dialog.Header>
              <Dialog.Title>Confirmar reserva simulada</Dialog.Title>
              <Dialog.Description>
                DEMO · Los cambios se reinician al recargar. Esta acción sólo cambia las cantidades
                reservadas y disponibles.
              </Dialog.Description>
            </Dialog.Header>
            <ul className="demo-stack">
              {shownLines.map((l) => (
                <li key={l.itemId}>
                  {items.find((i) => i.id === l.itemId)?.label}: <strong>{l.quantity}</strong>{" "}
                  {items.find((i) => i.id === l.itemId)?.unit}
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
                  onReserve(shownLines);
                  setOpen(false);
                }}
              >
                Confirmar reserva DEMO
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog>
      </Card.Content>
    </Card>
  );
}
