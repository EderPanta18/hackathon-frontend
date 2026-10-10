"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { Card } from "@/ui/display/card";
import { EmptyState } from "@/ui/feedback/empty-state";
import { Field } from "@/ui/form/field";
import { Button } from "@/ui/primitives/button";
import { ShelterDetail } from "../components/ShelterDetail";
import { demoScenario as s } from "../data/demo.fixtures";
import { geojsonFor } from "../data/demo.geojson";
import { indicatorsFor, needFor, sheltersFor } from "../data/demo.selectors";
import { useDemo } from "../state/DemoProvider";

const PiuraMap = dynamic(() => import("../components/DemoMap"), {
  ssr: false,
  loading: () => <div className={"demo-map"}>Preparando mapa DEMO…</div>,
});
export function DemoDashboard() {
  const { state } = useDemo();
  const [territory, setTerritory] = useState("");
  const [priority, setPriority] = useState("");
  const [selectedId, setSelectedId] = useState<string | undefined>(s.defaultShelterId);
  const visible = sheltersFor(territory, priority);
  const selected = visible.find((x) => x.id === selectedId);
  const data = useMemo(() => geojsonFor(territory, priority), [territory, priority]);
  const metrics = indicatorsFor(territory, priority, state);
  function clear() {
    setTerritory("");
    setPriority("");
    setSelectedId(s.defaultShelterId);
  }
  return (
    <>
      <div className={"demo-pageHeader"}>
        <div>
          <h1>Albergues y prioridades</h1>
          <p className={"demo-muted"}>
            Explora dónde se necesita ayuda en este escenario de Piura.
          </p>
        </div>
        <span className={"demo-tag"}>{s.referenceDate} · DEMO</span>
      </div>
      <section className={"demo-metrics"} aria-label="Indicadores del conjunto filtrado">
        {[
          ["Albergues", metrics.shelters, "En la selección territorial"],
          ["Personas", metrics.population, "Población ficticia agregada"],
          ["Prioridad alta", metrics.highPriority, "Etiqueta fija del escenario"],
          ["Necesidades por cubrir", metrics.uncoveredNeeds, "Pares albergue e insumo"],
        ].map(([label, value, description]) => (
          <Card key={label}>
            <Card.Content>
              <p className={"demo-metricLabel"}>{label}</p>
              <strong className={"demo-metricValue"}>{value}</strong>
              <p className={"demo-muted"}>{description}</p>
            </Card.Content>
          </Card>
        ))}
      </section>
      <div className={"demo-filters"}>
        <Field>
          <Field.Label htmlFor="demo-territory">Territorio de referencia</Field.Label>
          <select
            id="demo-territory"
            value={territory}
            onChange={(e) => {
              setTerritory(e.target.value);
              setSelectedId(undefined);
            }}
          >
            <option value="">Todos los sectores</option>
            {s.territories.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </Field>
        <Field>
          <Field.Label htmlFor="demo-priority">Prioridad del escenario</Field.Label>
          <select
            id="demo-priority"
            value={priority}
            onChange={(e) => {
              setPriority(e.target.value);
              setSelectedId(undefined);
            }}
          >
            <option value="">Todas las prioridades</option>
            {["alta", "media", "baja"].map((p) => (
              <option key={p} value={p}>
                Prioridad {p}
              </option>
            ))}
          </select>
        </Field>
        <Button variant="outline" tone="neutral" onClick={clear}>
          Limpiar filtros
        </Button>
      </div>
      <div className={"demo-dashboardGrid"}>
        <div className={"demo-stack"}>
          <PiuraMap
            data={data}
            selectedId={selectedId}
            onSelect={(id) => {
              if (visible.some((x) => x.id === id)) setSelectedId(id);
            }}
          />
          <section aria-label="Lista accesible de albergues">
            <div className={"demo-listHeading"}>
              <h2 className={"demo-subheading"}>Albergues del escenario</h2>
              <output aria-live="polite">{visible.length} encontrados</output>
            </div>
            {visible.length ? (
              <div className={"demo-shelterList"}>
                {visible.map((x) => (
                  <Button
                    key={x.id}
                    variant="ghost"
                    tone="neutral"
                    className={"demo-shelterButton"}
                    aria-pressed={selectedId === x.id}
                    onClick={() => setSelectedId(x.id)}
                  >
                    <span>
                      <strong>{x.name}</strong>
                      <span className={"demo-unit"}>
                        {x.population} personas · {x.id}
                      </span>
                    </span>
                    <span className={"demo-tag"}>Prioridad {x.priority}</span>
                  </Button>
                ))}
              </div>
            ) : (
              <EmptyState>
                <EmptyState.Header>
                  <EmptyState.Title>
                    <h2>Sin albergues en esta selección</h2>
                  </EmptyState.Title>
                  <EmptyState.Description>
                    Prueba otro sector o limpia los filtros.
                  </EmptyState.Description>
                </EmptyState.Header>
                <EmptyState.Actions>
                  <Button variant="outline" onClick={clear}>
                    Mostrar todos
                  </Button>
                </EmptyState.Actions>
              </EmptyState>
            )}
          </section>
          <p className={"demo-muted"}>
            Sectores y zonas ilustrativos, sin fronteras administrativas ni padrón actual
            verificado. Los nombres, posiciones y cantidades son ficticios.
          </p>
        </div>
        {selected ? (
          <ShelterDetail
            shelter={selected}
            territoryLabel={
              s.territories.find((t) => t.id === selected.territoryId)?.label ?? "DEMO"
            }
            referenceDate={s.referenceDate}
            sourceLabel={s.sourceLabel}
            needs={s.items.map((i) => ({
              itemId: i.id,
              label: i.label,
              unit: i.unit,
              ...needFor(selected.id, i.id, state),
            }))}
          />
        ) : (
          <Card>
            <Card.Content>
              <h2 className={"demo-subheading"}>Selecciona un albergue</h2>
              <p className={"demo-muted"}>
                Usa un pin del mapa o un botón de la lista para consultar su detalle.
              </p>
            </Card.Content>
          </Card>
        )}
      </div>
    </>
  );
}
