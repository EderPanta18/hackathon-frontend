// src/app/(public)/login/login-client-shell.tsx
//
"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/core/constants";
import { LoginCard } from "@/modules/auth/features";

export function LoginClientShell() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const handleSuccess = () => {
        queryClient.clear();
        router.replace(ROUTES.public.root);
        router.refresh();
    };

    return <LoginCard onSuccessAction={handleSuccess} />;
}
