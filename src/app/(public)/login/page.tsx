"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LoginCard } from "@/modules/auth/features";

const AFTER_LOGIN_PATH = "/dashboard";

export default function LoginPage() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const handleSuccess = () => {
        queryClient.clear();

        router.replace(AFTER_LOGIN_PATH);
        router.refresh();
    };

    return (
        <main className="flex min-h-dvh items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">
                <LoginCard onSuccessAction={handleSuccess} />
            </div>
        </main>
    );
}
