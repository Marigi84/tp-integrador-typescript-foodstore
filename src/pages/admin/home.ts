import "./admin.css";
import { requireRole } from "../../utils/navigate";
import { logoutUser } from "../../utils/auth";

const autorizado = requireRole("admin");

if (autorizado) {
    const logoutBtn = document.getElementById("logout");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            logoutUser();
            window.location.href = "/";
        });
    }
}