import { redirect } from "next/navigation";
import { ROUTES } from "@/core/constants";

export default function ComunaPage() {
    redirect(`${ROUTES.comuna.root}/dashboard`);
}
