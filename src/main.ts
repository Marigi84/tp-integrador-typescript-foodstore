import "./style.css";
import { renderLogin, initLogin } from "./pages/auth/login/login";
import { renderRegistro, initRegistro } from "./pages/auth/registro/registro";
import { ensureAdminExists, getSession } from "./utils/localStorage";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) throw new Error("No se encontró #app");

function guardRoute() {
  const user = getSession();
  const path = window.location.pathname;

  const isAdmin = path.includes("admin");
  const isStoreHome = path.includes("/src/pages/store/home/home.html");
  const isStoreCart = path.includes("/src/pages/store/cart/cart.html");
  const isClientArea = isStoreHome || isStoreCart;

  if ((isAdmin || isClientArea) && !user) {
    window.location.href = "/";
    return;
  }

  if (isAdmin && user?.rol !== "admin") {
    window.location.href = "/src/pages/store/home/home.html";
    return;
  }

  if (isClientArea && user?.rol !== "client") {
    window.location.href = "/admin.html";
    return;
  }

  if (!isAdmin && !isClientArea && user) {
    window.location.href =
      user.rol === "admin"
        ? "/admin.html"
        : "/src/pages/store/home/home.html";
  }
}

ensureAdminExists();
guardRoute();

app.innerHTML = `
  <main class="contenedor">
    <section class="form-login">
      <h1 class="titulo">Food Store</h1>
      <p class="subtitulo">Registro e inicio de sesión</p>

      ${renderRegistro()}

      <p class="registro">¿Ya tenés cuenta? Iniciá sesión abajo.</p>

      ${renderLogin()}

      <p id="message" class="registro"></p>
    </section>
  </main>
`;

initRegistro();
initLogin();