import { FileSpreadsheet, FileText } from "lucide-react";
import { Table } from "@/ui/display/table";
import type { DemoDocumentData } from "../data/demo.selectors";

export function DocumentPreview({
  type,
  data,
}: {
  type: "manifiesto" | "acta";
  data: DemoDocumentData;
}) {
  const manifest = type === "manifiesto";
  const received = data.status === "recibido";
  const Icon = manifest ? FileSpreadsheet : FileText;
  return (
    <section
      className="demo-document"
      aria-label={manifest ? "Vista previa de manifiesto Excel" : "Vista previa de acta PDF"}
    >
      <div className="demo-documentBar">
        <Icon aria-hidden="true" size={20} />
        <strong>{manifest ? "Manifiesto · Vista previa Excel" : "Acta · Vista previa PDF"}</strong>
        <span>DEMO</span>
      </div>
      <article className="demo-paper">
        <div className="demo-paperHeader">
          <div>
            <p>Piura Innova · Reto 21</p>
            <h2>{manifest ? "Manifiesto de carga" : "Acta de recepción"}</h2>
          </div>
          <strong className="demo-paperStamp">
            DEMO
            <br />
            <small>Sin validez oficial</small>
          </strong>
        </div>
        <p className="demo-documentReference">
          Referencia: <strong>{data.id}</strong> · {data.referenceDate}
        </p>
        <dl className="demo-documentFacts">
          <div>
            <dt>Origen</dt>
            <dd>{data.origin}</dd>
          </div>
          <div>
            <dt>Destino</dt>
            <dd>{data.destination}</dd>
          </div>
          <div>
            <dt>Vehículo ficticio</dt>
            <dd>{data.vehicle}</dd>
          </div>
        </dl>
        {!manifest && (
          <div className={received ? "demo-receiptReceived" : "demo-receiptPending"}>
            <strong>{received ? "Recepción simulada DEMO" : "Recepción pendiente"}</strong>
            <p>
              {received
                ? "El ejemplo figura recibido durante este recorrido. No acredita una entrega real."
                : "La carga no figura recibida. Esta vista previa no confirma una entrega."}
            </p>
          </div>
        )}
        <section
          className="demo-tableScroll"
          // biome-ignore lint/a11y/noNoninteractiveTabindex: El contenedor permite desplazar la tabla con flechas.
          tabIndex={0}
          aria-label="Tabla desplazable con teclado"
        >
          <Table>
            <Table.Caption>
              {manifest ? "Carga del manifiesto DEMO" : "Detalle de entrega del acta DEMO"}
            </Table.Caption>
            <Table.Header>
              <Table.Row>
                <Table.Head>Insumo</Table.Head>
                <Table.Head>Unidad</Table.Head>
                <Table.Head>Cantidad</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.lines.map((l) => (
                <Table.Row key={l.itemId}>
                  <Table.Cell>{l.label}</Table.Cell>
                  <Table.Cell>{l.unit}</Table.Cell>
                  <Table.Cell>{l.quantity}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </section>
        <div className="demo-paperFooter">
          <strong>Documento de ejemplo · Datos ficticios</strong>
          <p>
            Sin firma, certificación ni validez operativa. Esta pantalla permite revisar el
            contenido; no genera ni descarga un archivo final.
          </p>
        </div>
      </article>
    </section>
  );
}
