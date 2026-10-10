import { Suspense } from "react";
import { DemoDocument } from "@/modules/demo";

type PageProps = {
  searchParams: Promise<{ despacho?: string | string[] }>;
};

async function ManifestContent({ searchParams }: PageProps) {
  const { despacho } = await searchParams;
  const reference = Array.isArray(despacho) ? "__invalid__" : despacho;
  return <DemoDocument key={reference} type="manifiesto" reference={reference} />;
}

export default function ManifestPage(props: PageProps) {
  return (
    <Suspense fallback={<p aria-live="polite">Cargando manifiesto DEMO…</p>}>
      <ManifestContent {...props} />
    </Suspense>
  );
}
