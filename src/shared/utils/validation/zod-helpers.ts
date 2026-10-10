import { z } from "zod";

export function optionalText(max?: number) {
    let schema = z.string().trim();

    if (max !== undefined) schema = schema.max(max, `Máximo ${max} caracteres`);

    return schema.transform((value) => value || undefined).optional();
}

export function optionalEmail() {
    return z
        .string()
        .trim()
        .email({ error: "Ingresa un correo válido" })
        .or(z.literal(""))
        .transform((value) => value || undefined)
        .optional();
}

export function exactLength(length: number, message?: string) {
    return z
        .string()
        .trim()
        .regex(
            new RegExp(`^[a-zA-Z0-9]{${length}}$`),
            message ?? `${length} caracteres`,
        );
}

export function optionalExactLength(length: number, message?: string) {
    return z
        .string()
        .trim()
        .regex(new RegExp(`^\\d{${length}}$`), message ?? `${length} dígitos`)
        .or(z.literal(""))
        .transform((value) => value || undefined)
        .optional();
}
