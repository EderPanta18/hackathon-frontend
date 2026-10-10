import { redirect } from "next/navigation";
import { ROUTE_ACCESS_CONFIG } from "@/lib/config/routes.config";

export default function PublicPage() {
    redirect(ROUTE_ACCESS_CONFIG.signInPath ?? "/login");
}
