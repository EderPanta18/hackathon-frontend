import { DemoDispatches } from "@/modules/demo";
export default async function DispatchesPage({
  searchParams,
}: {
  searchParams: Promise<{ despacho?: string | string[] }>;
}) {
  const { despacho } = await searchParams;
  const reference = Array.isArray(despacho) ? "__invalid__" : despacho;
  return <DemoDispatches key={reference} reference={reference} />;
}
