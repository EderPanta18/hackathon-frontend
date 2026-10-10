"use client";

import Link from "next/link";
import { useState } from "react";
import { Field } from "@/ui/form/field";
import { Button } from "@/ui/primitives/button";
import { DocumentPreview } from "../components/DocumentPreview";
import { demoScenario as s } from "../data/demo.fixtures";
import { documentFor } from "../data/demo.selectors";
import { useDemo } from "../state/DemoProvider";

export function DemoDocument({
  type,
  reference,
}: {
  type: "manifiesto" | "acta";
  reference?: string;
}) {
  const { state } = useDemo();
  const invalid = Boolean(reference && !s.dispatches.some((x) => x.id === reference));
  const [selected, setSelected] = useState(!invalid && reference ? reference : s.defaultDispatchId);
  const data = documentFor(selected, state);
  if (!data) return null;
  return (
    <div className="demo-stack">
      <div className="demo-pageHeader">
        <div>
          <h1>{type === "manifiesto" ? "Vista previa de manifiesto" : "Vista previa de acta"}</h1>
          <p className="demo-muted">
            Revisa los datos del mismo despacho, sin generar documentos finales.
          </p>
        </div>
        <Button asChild variant="outline" tone="neutral">
          <Link href={`/demo/despachos?despacho=${encodeURIComponent(selected)}`}>
            Volver al despacho
          </Link>
        </Button>
      </div>
      {invalid && (
        <div role="alert" className="demo-notice">
          Referencia DEMO no encontrada. Se muestra un ejemplo válido identificado; selecciona otro
          si lo necesitas.
        </div>
      )}
      <div className="demo-filters">
        <Field>
          <Field.Label htmlFor="demo-document-dispatch">Despacho del documento</Field.Label>
          <select
            id="demo-document-dispatch"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {s.dispatches.map((x) => (
              <option key={x.id} value={x.id}>
                {x.id} · {s.shelters.find((a) => a.id === x.shelterId)?.name}
              </option>
            ))}
          </select>
        </Field>
        <p className="demo-muted">
          {reference && !invalid ? "Despacho referido" : "Ejemplo inicial identificado"}: {selected}
        </p>
      </div>
      <DocumentPreview type={type} data={data} />
    </div>
  );
}
