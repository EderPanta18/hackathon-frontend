import { redirect } from "next/navigation";
import { ROUTES } from "@/core/constants";

export default function BrigadaPage() {
    redirect(`${ROUTES.brigada.root}/dashboard`);
}
