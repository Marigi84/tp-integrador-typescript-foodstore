import { getSession } from "./localStorage";

export function goTo(path: string): void {
    window.location.href = path;
}

export function requireAuth(): boolean {
    const session = getSession();

    if (!session) {
        window.location.href = "/";
        return false;
    }

    return true;
}

export function requireRole(role: "admin" | "client"): boolean {
    const session = getSession();

    if (!session) {
        window.location.href = "/";
        return false;
    }

    if (session.rol !== role) {
        window.location.href = "/";
        return false;
    }

    return true;
}