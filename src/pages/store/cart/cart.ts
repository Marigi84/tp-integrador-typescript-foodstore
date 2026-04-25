import { requireRole } from "../../../utils/navigate";
import type { CartItem } from "../../../types/cartItem";
import {
    obtenerCarrito,
    incrementarCantidad,
    disminuirCantidad,
    eliminarProducto,
    vaciarCarrito,
} from "../../../utils/cart";
import { logoutUser } from "../../../utils/auth";
import { getSession } from "../../../utils/localStorage";
import "./cart.css";
import { mostrarToast } from "../../../utils/toast";
import "../../../style.css";

requireRole("client");

const logoutBtn = document.querySelector<HTMLButtonElement>("#logout");
const userName = document.getElementById("user-name");

const cartContainer = document.getElementById("cart-container");
const cartTotal = document.getElementById("cart-total");

const checkoutBtn = document.getElementById("checkout-btn") as HTMLButtonElement | null;
const clearBtn = document.getElementById("clear-cart-btn") as HTMLButtonElement | null;
const continueBtn = document.getElementById("continue-btn");

logoutBtn?.addEventListener("click", () => {
    logoutUser();
    window.location.href = "/";
});

const user = getSession();

if (user && userName) {
    userName.textContent = `👤 ${user.nombre}`;
}

function calcularTotal(carrito: CartItem[]): number {
    return carrito.reduce((total, item) => {
        return total + item.product.precio * item.cantidad;
    }, 0);
}

function renderizarCarrito(): void {
    if (!cartContainer || !cartTotal) return;

    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h3>🛒 Tu carrito está vacío</h3>
                <p>Agregá productos para comenzar tu compra</p>
                <button id="go-home">Ver catálogo</button>
            </div>
        `;

        cartTotal.textContent = "0";

        if (checkoutBtn) checkoutBtn.disabled = true;
        if (clearBtn) clearBtn.disabled = true;

        const goHomeBtn = document.getElementById("go-home");

        goHomeBtn?.addEventListener("click", () => {
            window.location.href = "/src/pages/store/home/home.html";
        });

        return;
    }

    if (checkoutBtn) checkoutBtn.disabled = false;
    if (clearBtn) clearBtn.disabled = false;

    cartContainer.innerHTML = "";

    carrito.forEach((item) => {
        const article = document.createElement("article");
        const subtotal = item.product.precio * item.cantidad;

        article.classList.add("cart-item");

        article.innerHTML = `
            <div class="cart-item-info">
                <img src="${item.product.imagen}" alt="${item.product.nombre}" />

                <div>
                    <h4>${item.product.nombre}</h4>
                    <p>${item.product.categorias[0].nombre}</p>
                    <p><strong>Subtotal:</strong> $${subtotal.toLocaleString("es-AR")}</p>
                </div>
            </div>

            <div class="cart-item-controls">
                <button class="restar qty-btn">-</button>
                <span>${item.cantidad}</span>
                <button class="sumar qty-btn">+</button>
                <button class="eliminar delete-btn">Eliminar</button>
            </div>
        `;

        const btnSumar = article.querySelector(".sumar");
        const btnRestar = article.querySelector(".restar");
        const btnEliminar = article.querySelector(".eliminar");

        btnSumar?.addEventListener("click", () => {
            incrementarCantidad(item.product.id);
            renderizarCarrito();
        });

        btnRestar?.addEventListener("click", () => {
            disminuirCantidad(item.product.id);
            renderizarCarrito();
        });

        btnEliminar?.addEventListener("click", () => {
            eliminarProducto(item.product.id);
            renderizarCarrito();
        });

        cartContainer.appendChild(article);
    });

    const total = calcularTotal(carrito);
    cartTotal.textContent = total.toLocaleString("es-AR");
}

continueBtn?.addEventListener("click", () => {
    window.location.href = "/src/pages/store/home/home.html";
});

clearBtn?.addEventListener("click", () => {
    vaciarCarrito();
    renderizarCarrito();
});

checkoutBtn?.addEventListener("click", () => {
    mostrarToast("Compra realizada con éxito 🎉");
    vaciarCarrito();
    renderizarCarrito();
});

renderizarCarrito();