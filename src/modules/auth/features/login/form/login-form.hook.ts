"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useLogin } from "@/modules/auth/hooks";
import { useScopedAction } from "@/shared/action-scope";
import { loginSchema, type LoginFormValues } from "./login-form.schema";

const DEFAULT_VALUES: LoginFormValues = {
    username: "",
    password: "",
};

type UseLoginFormOptions = {
    scopeId: string;
    onSuccessAction?: () => void;
};

export function useLoginForm({
    scopeId,
    onSuccessAction,
}: UseLoginFormOptions) {
    const methods = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: DEFAULT_VALUES,
        mode: "onChange",
    });

    const loginMutation = useLogin();
    const isLocked = methods.formState.isSubmitting || loginMutation.isPending;

    async function handleSubmit(values: LoginFormValues): Promise<void> {
        try {
            await loginMutation.mutateAsync(values);
        } catch {
            toast.error(
                "No fue posible iniciar sesión. Verifica tus credenciales.",
            );

            return;
        }

        toast.success("Inicio de sesión exitoso");
        onSuccessAction?.();
    }

    // Permite observar/ejecutar esta acción desde otro componente si es necesario.
    useScopedAction({
        scopeId,
        isPending: isLocked,
        canExecute: methods.formState.isValid && !isLocked,
        executeAction: () => methods.handleSubmit(handleSubmit)(),
    });

    return { methods, handleSubmit, isLocked };
}
