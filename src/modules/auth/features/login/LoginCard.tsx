"use client";

import { useId } from "react";
import { useActionScope } from "@/shared/action-scope";
import { Card } from "@/ui/display/card";
import { Button } from "@/ui/primitives/button";
import Login from "./Login";

export type LoginCardProps = {
    onSuccessAction?: () => void;
};

export function LoginCard({ onSuccessAction }: LoginCardProps) {
    // Cada instancia tiene IDs propios: evita colisiones con formularios simultáneos.
    const id = useId();
    const formId = `login-form-${id}`;
    const scopeId = `login-${id}`;

    const { isPending, canExecute } = useActionScope(scopeId);

    return (
        <Card className="rounded-2xl shadow-lg">
            <Card.Header className="text-center">
                <Card.Title className="text-2xl font-bold tracking-tight">
                    Iniciar sesión
                </Card.Title>
                <Card.Description>
                    Ingresa tus credenciales para acceder.
                </Card.Description>
            </Card.Header>

            <Card.Content className="py-4">
                <Login
                    formId={formId}
                    scopeId={scopeId}
                    onSuccessAction={onSuccessAction}
                />
            </Card.Content>

            <Card.Footer>
                <Button
                    form={formId}
                    type="submit"
                    size="lg"
                    tone="primary"
                    variant="solid"
                    pending={isPending}
                    disabled={!canExecute}
                    className="w-full"
                >
                    Iniciar sesión
                </Button>
            </Card.Footer>
        </Card>
    );
}

export default LoginCard;
