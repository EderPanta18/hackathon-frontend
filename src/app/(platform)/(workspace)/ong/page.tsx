import { redirect } from "next/navigation";
import { ROUTES } from "@/core/constants";

export default function OngPage() {
    redirect(`${ROUTES.ong.root}/dashboard`);
}
