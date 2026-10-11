// src/app/(public)/login/page.tsx

import { isDevAuthEnabled } from "@/modules/dev-auth";
import { DevRoleSwitcher } from "@/modules/dev-auth/components/dev-role-switcher";
import { LoginClientShell } from "./LoginClientShell";

export default function LoginPage() {
    const devAuthEnabled = isDevAuthEnabled();

    return (
        <main className="flex min-h-dvh items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">
                <LoginClientShell />
                {devAuthEnabled && <DevRoleSwitcher />}
            </div>
        </main>
    );
}
