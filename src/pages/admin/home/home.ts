import "../../../style.css";
import { requireRole } from "../../../utils/navigate";
import "./admin.css";
import { logoutUser } from "../../../utils/auth";


requireRole("admin");

const logoutBtn = document.querySelector<HTMLButtonElement>("#logout");

logoutBtn?.addEventListener("click", () => {
    logoutUser();
    window.location.href = "/";
});