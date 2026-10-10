import Link from "next/link";
import { Card } from "@/ui/display/card";
import { Table } from "@/ui/display/table";
import { Badge } from "@/ui/primitives/badge";
import { Button } from "@/ui/primitives/button";
import type { Shelter } from "../data/demo.types";

export type ShelterDetailProps = {
  shelter: Shelter;
  territoryLabel: string;
  referenceDate: string;
  sourceLabel: string;
  needs: {
    itemId: string;
    label: string;
    unit: string;
    required: number;
    received: number;
    uncovered: number;
  }[];
};
export function ShelterDetail({
  shelter,
  territoryLabel,
  referenceDate,
  sourceLabel,
  needs,
}: ShelterDetailProps) {
  return (
    <Card className={"demo-shelterDetail"}>
      <Card.Header>
        <div className={"demo-row"}>
          <Badge tone={shelter.priority === "alta" ? "destructive" : "neutral"} variant="soft">
            Prioridad {shelter.priority}
          </Badge>
          <span className={"demo-muted"}>{shelter.id}</span>
        </div>
        <Card.Title>
          <h2>{shelter.name}</h2>
        </Card.Title>
        <Card.Description>{territoryLabel}</Card.Description>
      </Card.Header>
      <Card.Content className={"demo-stack"}>
        <div>
          <span className={"demo-population"}>{shelter.population}</span> personas del escenario
        </div>
        <div>
          <h3 className={"demo-subheading"}>Grupos vulnerables</h3>
          <dl className={"demo-facts"}>
            {shelter.vulnerableGroups.map((g) => (
              <div key={g.label}>
                <dt>{g.label}</dt>
                <dd>{g.count}</dd>
              </div>
            ))}
          </dl>
          <p className={"demo-muted"}>
            Los grupos pueden solaparse; no se suman como personas distintas.
          </p>
        </div>
        <div className={"demo-tableScroll"}>
          <Table>
            <Table.Caption>Necesidades del albergue DEMO</Table.Caption>
            <Table.Header>
              <Table.Row>
                <Table.Head>Insumo</Table.Head>
                <Table.Head>Demanda</Table.Head>
                <Table.Head>Por cubrir</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {needs.map((n) => (
                <Table.Row key={n.itemId}>
                  <Table.Cell>
                    {n.label}
                    <small className={"demo-unit"}>{n.unit}</small>
                  </Table.Cell>
                  <Table.Cell>
                    {n.required}
                    <small className={"demo-unit"}>{n.received} recibidos</small>
                  </Table.Cell>
                  <Table.Cell>{n.uncovered}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        <p className={"demo-muted"}>
          Prioridad fija y ubicación aproximada DEMO.
          <br />
          {sourceLabel} · {referenceDate}
        </p>
      </Card.Content>
      <Card.Footer>
        <Button asChild className="w-full">
          <Link href={`/demo/asignaciones?albergue=${encodeURIComponent(shelter.id)}`}>
            Explorar asignación DEMO
          </Link>
        </Button>
      </Card.Footer>
    </Card>
  );
}
