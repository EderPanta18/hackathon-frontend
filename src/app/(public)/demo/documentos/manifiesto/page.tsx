import { DemoDocument } from "@/modules/demo";
export default async function ManifestPage({
  searchParams,
}: {
  searchParams: Promise<{ despacho?: string | string[] }>;
}) {
  const { despacho } = await searchParams;
  const reference = Array.isArray(despacho) ? "__invalid__" : despacho;
  return <DemoDocument key={reference} type="manifiesto" reference={reference} />;
}
