import { DemoAssignments } from "@/modules/demo";
export default async function AssignmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ albergue?: string | string[] }>;
}) {
  const { albergue } = await searchParams;
  const reference = Array.isArray(albergue) ? "__invalid__" : albergue;
  return <DemoAssignments key={reference} reference={reference} />;
}
