import { z } from "zod";

export const loginSchema = z.object({
    username: z.string().trim().min(1, "Ingresa tu usuario"),
    // No hacer trim(): los espacios pueden formar parte de la contraseña.
    password: z.string().min(1, "Ingresa tu contraseña"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
