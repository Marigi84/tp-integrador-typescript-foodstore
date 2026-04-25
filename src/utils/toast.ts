export function mostrarToast(mensaje: string): void {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `✔️ ${mensaje}`;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("toast-visible");
    }, 10);

    setTimeout(() => {
        toast.classList.remove("toast-visible");

        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 2500);
}