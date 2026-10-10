"use client";

import { useId } from "react";
import { Controller } from "react-hook-form";
import { Form } from "@/shared/components";
import { Field, Input } from "@/ui/form";
import { useLoginForm } from "./login-form.hook";
import type { LoginFormValues } from "./login-form.schema";

export type LoginFormProps = {
    formId: string;
    scopeId: string;
    onSuccessAction?: () => void;
};

export function LoginForm({
    formId,
    scopeId,
    onSuccessAction,
}: LoginFormProps) {
    const { methods, handleSubmit, isLocked } = useLoginForm({
        scopeId,
        onSuccessAction,
    });

    const usernameFieldId = useId();
    const passwordFieldId = useId();

    return (
        <Form<LoginFormValues>
            id={formId}
            methods={methods}
            onSubmit={handleSubmit}
            autoComplete="on"
        >
            <div className="grid gap-6">
                <Controller
                    control={methods.control}
                    name="username"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={!!fieldState.error}>
                            <Field.Label htmlFor={usernameFieldId}>
                                <span>Usuario</span>
                                <span className="text-destructive">*</span>
                            </Field.Label>
                            <Field.Content>
                                <Input
                                    {...field}
                                    id={usernameFieldId}
                                    type="text"
                                    autoComplete="username"
                                    value={field.value ?? ""}
                                    aria-invalid={!!fieldState.error}
                                    disabled={isLocked}
                                />
                            </Field.Content>
                            <Field.Error>
                                {fieldState.error?.message}
                            </Field.Error>
                        </Field>
                    )}
                />

                <Controller
                    control={methods.control}
                    name="password"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={!!fieldState.error}>
                            <Field.Label htmlFor={passwordFieldId}>
                                <span>Contraseña</span>
                                <span className="text-destructive">*</span>
                            </Field.Label>
                            <Field.Content>
                                <Input
                                    {...field}
                                    id={passwordFieldId}
                                    type="password"
                                    autoComplete="current-password"
                                    value={field.value ?? ""}
                                    aria-invalid={!!fieldState.error}
                                    disabled={isLocked}
                                />
                            </Field.Content>
                            <Field.Error>
                                {fieldState.error?.message}
                            </Field.Error>
                        </Field>
                    )}
                />
            </div>
        </Form>
    );
}

export default LoginForm;
