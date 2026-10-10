import { Suspense } from "react";
import { DemoDocument } from "@/modules/demo";

type PageProps = {
  searchParams: Promise<{ despacho?: string | string[] }>;
};

async function ReceiptContent({ searchParams }: PageProps) {
  const { despacho } = await searchParams;
  const reference = Array.isArray(despacho) ? "__invalid__" : despacho;
  return <DemoDocument key={reference} type="acta" reference={reference} />;
}

export default function ReceiptPage(props: PageProps) {
  return (
    <Suspense fallback={<p aria-live="polite">Cargando acta DEMO…</p>}>
      <ReceiptContent {...props} />
    </Suspense>
  );
}
