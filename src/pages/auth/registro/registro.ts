import { registerUser } from "../../../utils/auth";

export function renderRegistro(): string {
    return `
    <form id="register-form">
      <label>Nombre</label>
      <input type="text" id="register-nombre" required />

      <label>Email</label>
      <input type="email" id="register-email" required />

      <label>Contraseña</label>
      <input type="password" id="register-password" required />

      <button type="submit">Registrarse</button>
    </form>
  `;
}

export function initRegistro(): void {
    const form = document.querySelector<HTMLFormElement>("#register-form");

    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = (document.getElementById("register-nombre") as HTMLInputElement).value.trim();
        const email = (document.getElementById("register-email") as HTMLInputElement).value.trim().toLowerCase();
        const password = (document.getElementById("register-password") as HTMLInputElement).value.trim();

        const result = registerUser(nombre, email, password);

        const message = document.getElementById("message");
        if (message) message.textContent = result.message;

        if (result.ok) form.reset();
    });
}