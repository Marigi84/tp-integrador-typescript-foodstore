import type { IUser } from "../types/IUser";

const USERS_KEY = "users";
const SESSION_KEY = "userData";

export function getUsers(): IUser[] {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
}

export function saveUsers(users: IUser[]): void {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getSession(): IUser | null {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
}

export function saveSession(user: IUser): void {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearSession(): void {
    localStorage.removeItem(SESSION_KEY);
}

export function ensureAdminExists(): void {
    const users = getUsers();

    const adminExists = users.some(
        (user) => user.email === "admin@foodstore.com"
    );

    if (!adminExists) {
        users.push({
            id: Date.now(),
            nombre: "Administrador",
            email: "admin@foodstore.com",
            password: "admin123",
            rol: "admin"
        });

        saveUsers(users);
    }
}