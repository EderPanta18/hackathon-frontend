"use client";

import { useState } from "react";
import { Card } from "@/ui/display/card";
import { Table } from "@/ui/display/table";
import { Field } from "@/ui/form/field";
import { AssignmentForm } from "../components/AssignmentForm";
import { demoScenario as s } from "../data/demo.fixtures";
import { inventoryFor, proposalFor } from "../data/demo.selectors";
import { useDemo } from "../state/DemoProvider";

export function DemoAssignments({ reference }: { reference?: string }) {
  const { state, act } = useDemo();
  const invalid = Boolean(reference && !s.shelters.some((x) => x.id === reference));
  const [selected, setSelected] = useState(!invalid && reference ? reference : s.defaultShelterId);
  const shelter = s.shelters.find((x) => x.id === selected);
  const proposal = s.proposals.find((x) => x.shelterId === selected);
  const summary = proposalFor(proposal?.id ?? "", state);
  if (!shelter || !proposal || !summary) return null;
  return (
    <div className="demo-stack">
      <div className="demo-pageHeader">
        <div>
          <h1>Asignaciones simuladas</h1>
          <p className="demo-muted">
            Contrasta las necesidades con lo disponible antes de reservar.
          </p>
        </div>
        <span className="demo-tag">DEMO · Sin movimientos reales</span>
      </div>
      {invalid && (
        <div role="alert" className="demo-notice">
          Referencia DEMO no encontrada. Se muestra un ejemplo válido; puedes seleccionar otro
          albergue.
        </div>
      )}
      <div className="demo-filters">
        <Field>
          <Field.Label htmlFor="demo-assignment-shelter">Albergue de la propuesta</Field.Label>
          <select
            id="demo-assignment-shelter"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {s.shelters.map((x) => (
              <option key={x.id} value={x.id}>
                {x.name} · prioridad {x.priority}
              </option>
            ))}
          </select>
        </Field>
        <p className="demo-muted">
          {reference ? "Ejemplo seleccionado" : "Ejemplo inicial"}: {shelter.name}
          <br />
          Prioridad {shelter.priority}, fija durante la simulación.
        </p>
      </div>
      <Card>
        <Card.Header>
          <Card.Title>
            <h2>Stock en {s.warehouses[0].name}</h2>
          </Card.Title>
          <Card.Description>
            Inventario compartido. Los despachos de ejemplo ya están contemplados; en tránsito y
            recibido ya salieron del origen.
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="demo-tableScroll">
            <Table>
              <Table.Caption>Cantidades DEMO por insumo</Table.Caption>
              <Table.Header>
                <Table.Row>
                  {[
                    "Insumo / unidad",
                    "Existencias",
                    "Reserva base preparada",
                    "Reservas nuevas DEMO",
                    "Disponible",
                  ].map((h) => (
                    <Table.Head key={h}>{h}</Table.Head>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {s.items.map((i) => {
                  const stock = inventoryFor(proposal.warehouseId, i.id, state);
                  return (
                    <Table.Row key={i.id}>
                      <Table.Cell>
                        {i.label}
                        <small className="demo-unit">{i.unit}</small>
                      </Table.Cell>
                      <Table.Cell>{stock.onHand}</Table.Cell>
                      <Table.Cell>{stock.reservedBaseline}</Table.Cell>
                      <Table.Cell>{stock.reservedNew}</Table.Cell>
                      <Table.Cell>
                        <strong>{stock.available}</strong>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </div>
        </Card.Content>
      </Card>
      <AssignmentForm
        key={proposal.id}
        summary={summary}
        items={s.items}
        onReserve={(lines) => act({ type: "reserve", proposalId: proposal.id, lines })}
      />
      <p className="demo-muted">
        Una propuesta no es una entrega. Reservar sólo modifica disponibilidad y reservas DEMO. Los
        despachos de ejemplo permanecen independientes.
      </p>
    </div>
  );
}
