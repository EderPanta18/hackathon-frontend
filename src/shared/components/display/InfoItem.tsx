import type { ReactNode } from "react";
import { cn } from "@/lib/styling";

export type InfoItemProps = {
    label: string;
    value: ReactNode;
    icon?: ReactNode;
    className?: string;
};

export function InfoItem({ label, value, icon, className }: InfoItemProps) {
    return (
        <span
            className={cn("inline-flex items-center gap-1 text-xs", className)}
        >
            {icon && (
                <span className="shrink-0 text-foreground/50">{icon}</span>
            )}

            <span className="text-foreground/75">{label}:</span>
            <span className="font-semibold text-foreground">{value}</span>
        </span>
    );
}

export default InfoItem;
