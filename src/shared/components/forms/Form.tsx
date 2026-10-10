"use client";

import type { FormHTMLAttributes, ReactNode } from "react";
import {
    FormProvider,
    type FieldValues,
    type UseFormReturn,
} from "react-hook-form";

export type FormProps<T extends FieldValues> = Omit<
    FormHTMLAttributes<HTMLFormElement>,
    "onSubmit" | "children"
> & {
    methods: UseFormReturn<T>;
    onSubmit: (values: T) => void | Promise<void>;
    children: ReactNode;
};

export function Form<T extends FieldValues>({
    methods,
    onSubmit,
    children,
    ...props
}: FormProps<T>) {
    return (
        <FormProvider {...methods}>
            <form
                {...props}
                noValidate
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                {children}
            </form>
        </FormProvider>
    );
}

export default Form;
