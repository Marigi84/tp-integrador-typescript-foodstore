import "./admin.css";
import { getSession } from "../../utils/localStorage";
import { logoutUser } from "../../utils/auth";

const user = getSession();

if (!user) {
    window.location.href = "/";
} else if (user.rol !== "admin") {
    window.location.href = "/cliente.html";
}

const logoutBtn = document.querySelector<HTMLButtonElement>("#logout");

logoutBtn?.addEventListener("click", () => {
    logoutUser();
    window.location.href = "/";
});