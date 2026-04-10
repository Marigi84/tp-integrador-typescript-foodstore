import { requireRole } from "../../utils/navigate";
import { logoutUser } from "../../utils/auth";

requireRole("client");

const logoutBtn = document.getElementById("logout");

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        logoutUser();
        window.location.href = "/";
    });
}