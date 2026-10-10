type SameSite = "strict" | "lax" | "none";

export type ClientCookieOptions = {
    maxAge?: number;
    path?: string;
    sameSite?: SameSite;
};

interface BrowserCookieStore {
    get(name: string): Promise<{ value: string } | undefined>;
    set(options: {
        name: string;
        value: string;
        path?: string;
        sameSite?: SameSite;
        expires?: number;
    }): Promise<void>;
    delete(options: { name: string; path?: string }): Promise<void>;
}

function getCookieStore(): BrowserCookieStore {
    if (typeof window === "undefined" || !("cookieStore" in window))
        throw new Error("Cookie Store API no disponible");

    return (window as Window & { cookieStore: BrowserCookieStore }).cookieStore;
}

export async function setClientCookie(
    name: string,
    value: string | number | boolean,
    options: ClientCookieOptions = {},
): Promise<void> {
    const { maxAge, path = "/", sameSite = "lax" } = options;

    await getCookieStore().set({
        name,
        value: String(value),
        path,
        sameSite,
        ...(maxAge !== undefined
            ? { expires: Date.now() + maxAge * 1000 }
            : {}),
    });
}

export async function getClientCookie(
    name: string,
): Promise<string | undefined> {
    const cookie = await getCookieStore().get(name);

    return cookie?.value;
}

export async function removeClientCookie(
    name: string,
    path = "/",
): Promise<void> {
    await getCookieStore().delete({ name, path });
}
