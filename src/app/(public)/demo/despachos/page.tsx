import { Suspense } from "react";
import { DemoDispatches } from "@/modules/demo";

type PageProps = {
  searchParams: Promise<{ despacho?: string | string[] }>;
};

async function DispatchesContent({ searchParams }: PageProps) {
  const { despacho } = await searchParams;
  const reference = Array.isArray(despacho) ? "__invalid__" : despacho;
  return <DemoDispatches key={reference} reference={reference} />;
}

export default function DispatchesPage(props: PageProps) {
  return (
    <Suspense fallback={<p aria-live="polite">Cargando despachos DEMO…</p>}>
      <DispatchesContent {...props} />
    </Suspense>
  );
}
