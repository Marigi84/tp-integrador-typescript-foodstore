import { requireRole } from "../../../utils/navigate";
import type { CartItem } from "../../../types/cartItem";
import {
    obtenerCarrito,
    incrementarCantidad,
    disminuirCantidad,
    eliminarProducto,
    vaciarCarrito,
} from "../../../utils/cart";

requireRole("client");

const cartContainer = document.getElementById("cart-container");
const cartTotal = document.getElementById("cart-total");

function calcularTotal(carrito: CartItem[]): number {
    return carrito.reduce((total, item) => {
        return total + item.product.precio * item.cantidad;
    }, 0);
}

function renderizarCarrito(): void {
    if (!cartContainer || !cartTotal) return;

    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        cartContainer.innerHTML = "<p>El carrito está vacío.</p>";
        cartTotal.textContent = "0";
        return;
    }

    cartContainer.innerHTML = "";

    carrito.forEach((item) => {
        const article = document.createElement("article");

        const subtotal = item.product.precio * item.cantidad;

        article.innerHTML = `
            <h3>${item.product.nombre}</h3>
            <p><strong>Precio:</strong> $${item.product.precio}</p>
            <p><strong>Cantidad:</strong> ${item.cantidad}</p>
            <p><strong>Subtotal:</strong> $${subtotal}</p>

            <button class="sumar">+</button>
            <button class="restar">-</button>
            <button class="eliminar">Eliminar</button>
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
    cartTotal.textContent = total.toString();
}

renderizarCarrito();