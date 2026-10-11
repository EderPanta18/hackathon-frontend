// src/modules/dev-auth/components/dev-role-switcher.tsx

"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Role } from "@/core/enums";
import { ROUTES } from "@/core/constants";
import { Button } from "@/ui/primitives/button";
import { DEV_IDENTITIES } from "../dev-auth.constants";

const ROLES: readonly Role[] = [
    Role.COMUNA,
    Role.ONG,
    Role.BRIGADA,
    Role.DEFENSA_CIVIL,
];

export function DevRoleSwitcher() {
    const router = useRouter();
    const [pending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    async function signIn(role: Role) {
        setError(null);

        const response = await fetch("/api/dev-auth/sign-in", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ role }),
        });

        if (!response.ok) {
            setError("No se pudo iniciar sesión de desarrollo.");

            return;
        }

        startTransition(() => {
            router.replace(ROUTES.public.root);
            router.refresh();
        });
    }

    async function signOut() {
        await fetch("/api/dev-auth/sign-out", { method: "POST" });

        startTransition(() => {
            router.replace(ROUTES.public.login);
            router.refresh();
        });
    }

    return (
        <section
            aria-label="Autenticación local de desarrollo"
            className="mt-6 rounded-lg border border-dashed p-4"
        >
            <h2 className="text-sm font-semibold">
                Modo desarrollo · Sesión local
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
                Solo disponible con <code>DEV_AUTH_ENABLED=true</code>.
            </p>

            <div className="mt-3 grid grid-cols-2 gap-2">
                {ROLES.map((role) => (
                    <Button
                        key={role}
                        type="button"
                        variant="outline"
                        tone="neutral"
                        size="sm"
                        disabled={pending}
                        onClick={() => void signIn(role)}
                    >
                        {DEV_IDENTITIES[role].name}
                    </Button>
                ))}
            </div>

            <Button
                type="button"
                variant="ghost"
                tone="neutral"
                size="sm"
                className="mt-3 w-full"
                disabled={pending}
                onClick={() => void signOut()}
            >
                Cerrar sesión local
            </Button>

            {error && (
                <p role="alert" className="mt-2 text-xs text-destructive">
                    {error}
                </p>
            )}
        </section>
    );
}
