import type { IUser } from "../types/IUser";
import type { Rol } from "../types/Rol";
import { getUsers, saveUsers, saveSession, clearSession } from "./localStorage";

export function registerUser(
    nombre: string,
    email: string,
    password: string,
    rol: Rol
): { ok: boolean; message: string } {
    const users = getUsers();

    const userExists = users.some((user) => user.email === email);

    if (userExists) {
    return { ok: false, message: "Ya existe un usuario registrado con ese email." };
}

const newUser: IUser = {
    id: Date.now(),
    nombre,
    email,
    password,
    rol
};

users.push(newUser);
saveUsers(users);

return { ok: true, message: "Usuario registrado correctamente." };
}

export function loginUser(
email: string,
password: string
): { ok: boolean; message: string; user?: IUser } {
const users = getUsers();

const userFound = users.find(
    (user) => user.email === email && user.password === password
);

if (!userFound) {
    return { ok: false, message: "Email o contraseña incorrectos." };
}

saveSession(userFound);

return { ok: true, message: "Login correcto.", user: userFound };
}

export function logoutUser(): void {
clearSession();
}