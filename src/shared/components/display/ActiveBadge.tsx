import { Badge, type BadgeProps } from "@/ui/primitives/badge";

export type ActiveBadgeProps = Omit<BadgeProps, "tone" | "children"> & {
    isActive: boolean;
    activeLabel?: string;
    inactiveLabel?: string;
};

export function ActiveBadge({
    isActive,
    activeLabel = "Activo",
    inactiveLabel = "Inactivo",
    ...props
}: ActiveBadgeProps) {
    return (
        <Badge tone={isActive ? "success" : "neutral"} {...props}>
            {isActive ? activeLabel : inactiveLabel}
        </Badge>
    );
}

export default ActiveBadge;
