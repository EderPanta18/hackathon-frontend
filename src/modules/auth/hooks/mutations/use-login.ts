"use client";

import { useMutation } from "@tanstack/react-query";
import { authService } from "@/modules/auth/services";

export function useLogin() {
    return useMutation({
        mutationFn: authService.login,
    });
}
