import "./style.css";
import { registerUser, loginUser } from "./utils/auth";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("No se encontró el contenedor #app");
}

app.innerHTML = `
  <main class="contenedor">
    <section class="form-login">
      <h1 class="titulo">Food Store</h1>
      <p class="subtitulo">Registro e inicio de sesión</p>

      <form id="register-form">
        <label for="register-nombre">Nombre</label>
        <input type="text" id="register-nombre" placeholder="Nombre" required />

        <label for="register-email">Email</label>
        <input type="email" id="register-email" placeholder="Email" required />

        <label for="register-password">Contraseña</label>
        <input type="password" id="register-password" placeholder="Contraseña" required />

        <label for="register-rol">Rol</label>
        <select id="register-rol" required>
          <option value="">Seleccione un rol</option>
          <option value="client">Cliente</option>
          <option value="admin">Administrador</option>
        </select>

        <button type="submit">Registrarse</button>
      </form>

      <p class="registro">¿Ya tenés cuenta? Iniciá sesión abajo.</p>

      <form id="login-form">
        <label for="login-email">Email</label>
        <input type="email" id="login-email" placeholder="Email" required />

        <label for="login-password">Contraseña</label>
        <input type="password" id="login-password" placeholder="Contraseña" required />

        <button type="submit">Ingresar</button>
      </form>

      <p id="message" class="registro"></p>
    </section>
  </main>
`;

const registerForm = document.querySelector<HTMLFormElement>("#register-form");
const loginForm = document.querySelector<HTMLFormElement>("#login-form");
const message = document.querySelector<HTMLParagraphElement>("#message");

if (!registerForm || !loginForm || !message) {
  throw new Error("No se pudieron obtener los elementos del formulario");
}

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nombreInput = document.querySelector<HTMLInputElement>("#register-nombre");
  const emailInput = document.querySelector<HTMLInputElement>("#register-email");
  const passwordInput = document.querySelector<HTMLInputElement>("#register-password");
  const rolInput = document.querySelector<HTMLSelectElement>("#register-rol");

  if (!nombreInput || !emailInput || !passwordInput || !rolInput) {
    return;
  }

  const nombre = nombreInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const rol = rolInput.value as "admin" | "client";

  const result = registerUser(nombre, email, password, rol);

  message.textContent = result.message;

  if (result.ok) {
    registerForm.reset();
  }
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const emailInput = document.querySelector<HTMLInputElement>("#login-email");
  const passwordInput = document.querySelector<HTMLInputElement>("#login-password");

  if (!emailInput || !passwordInput) {
    return;
  }

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  const result = loginUser(email, password);

  message.textContent = result.message;

  if (result.ok && result.user) {
    if (result.user.rol === "admin") {
      window.location.href = "/admin.html";
    } else {
      window.location.href = "/client.html";
    }
  }
});