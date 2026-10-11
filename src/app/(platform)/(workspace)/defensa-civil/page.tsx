import { redirect } from "next/navigation";
import { ROUTES } from "@/core/constants";

export default function DefensaCivilPage() {
    redirect(`${ROUTES.defensaCivil.root}/dashboard`);
}
