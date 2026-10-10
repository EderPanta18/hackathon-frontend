import { Card } from "@/ui/display/card";
import { Table } from "@/ui/display/table";
import { Badge } from "@/ui/primitives/badge";
import type { Shelter } from "../data/demo.types";
import styles from "./demo.module.css";

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
    <Card className={styles.shelterDetail}>
      <Card.Header>
        <div className={styles.row}>
          <Badge tone={shelter.priority === "alta" ? "destructive" : "neutral"} variant="soft">
            Prioridad {shelter.priority}
          </Badge>
          <span className={styles.muted}>{shelter.id}</span>
        </div>
        <Card.Title>
          <h2>{shelter.name}</h2>
        </Card.Title>
        <Card.Description>{territoryLabel}</Card.Description>
      </Card.Header>
      <Card.Content className={styles.stack}>
        <div>
          <span className={styles.population}>{shelter.population}</span> personas del escenario
        </div>
        <div>
          <h3 className={styles.subheading}>Grupos vulnerables</h3>
          <dl className={styles.facts}>
            {shelter.vulnerableGroups.map((g) => (
              <div key={g.label}>
                <dt>{g.label}</dt>
                <dd>{g.count}</dd>
              </div>
            ))}
          </dl>
          <p className={styles.muted}>
            Los grupos pueden solaparse; no se suman como personas distintas.
          </p>
        </div>
        <div className={styles.tableScroll}>
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
                    <small className={styles.unit}>{n.unit}</small>
                  </Table.Cell>
                  <Table.Cell>
                    {n.required}
                    <small className={styles.unit}>{n.received} recibidos</small>
                  </Table.Cell>
                  <Table.Cell>{n.uncovered}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        <p className={styles.muted}>
          Prioridad fija y ubicación aproximada DEMO.
          <br />
          {sourceLabel} · {referenceDate}
        </p>
      </Card.Content>
    </Card>
  );
}
