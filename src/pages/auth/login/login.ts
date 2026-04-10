import { loginUser } from "../../../utils/auth";

export function renderLogin(): string {
    return `
    <form id="login-form">
      <label>Email</label>
      <input type="email" id="login-email" required />

      <label>Contraseña</label>
      <input type="password" id="login-password" required />

      <button type="submit">Ingresar</button>
    </form>
  `;
}

export function initLogin(): void {
    const form = document.querySelector<HTMLFormElement>("#login-form");

    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = (document.getElementById("login-email") as HTMLInputElement).value.trim().toLowerCase();
        const password = (document.getElementById("login-password") as HTMLInputElement).value.trim();

        const result = loginUser(email, password);

        const message = document.getElementById("message");
        if (message) message.textContent = result.message;

        if (result.ok && result.user) {
            window.location.href =
                result.user.rol === "admin" ? "/admin.html" : "/cliente.html";
        }
    });
}