import { Suspense } from "react";
import { DemoAssignments } from "@/modules/demo";

type PageProps = {
  searchParams: Promise<{ albergue?: string | string[] }>;
};

async function AssignmentsContent({ searchParams }: PageProps) {
  const { albergue } = await searchParams;
  const reference = Array.isArray(albergue) ? "__invalid__" : albergue;
  return <DemoAssignments key={reference} reference={reference} />;
}

export default function AssignmentsPage(props: PageProps) {
  return (
    <Suspense fallback={<p aria-live="polite">Cargando asignaciones DEMO…</p>}>
      <AssignmentsContent {...props} />
    </Suspense>
  );
}
