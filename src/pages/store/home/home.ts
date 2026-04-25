import "./home.css";
import { requireRole } from "../../../utils/navigate";
import { PRODUCTS, getCategories } from "../../../data/data";
import type { Product } from "../../../types/product";
import { agregarAlCarrito } from "../../../utils/cart";
import { logoutUser } from "../../../utils/auth";
import { getSession } from "../../../utils/localStorage";
import { mostrarToast } from "../../../utils/toast";
import "../../../style.css";

requireRole("client");

const contenedorProductos = document.getElementById("contenedor-productos");
const listaCategorias = document.getElementById("lista-categorias");
const searchInput = document.getElementById("search-input") as HTMLInputElement | null;
const logoutBtn = document.querySelector<HTMLButtonElement>("#logout");
const catalogoResumen = document.getElementById("catalogo-resumen");

logoutBtn?.addEventListener("click", () => {
    logoutUser();
    window.location.href = "/";
});

const user = getSession();
const userName = document.getElementById("user-name");

if (user && userName) {
    userName.textContent = `👤 ${user.nombre}`;
}

if (user?.rol === "admin") {
    const nav = document.querySelector("nav"); // mejor que ".navbar"

    const adminBtn = document.createElement("button");
    adminBtn.textContent = "Panel Admin";

    adminBtn.addEventListener("click", () => {
        window.location.href = "/admin.html";
    });

    nav?.appendChild(adminBtn);
}

function crearCardProducto(producto: Product): HTMLElement {
    const article = document.createElement("article");

    article.innerHTML = `
        <img src="/assets/${producto.imagen}" alt="${producto.nombre}" class="producto-img" />
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <p><strong>Categoría:</strong> ${producto.categorias[0].nombre}</p>
        <p><strong>Precio:</strong> $${producto.precio}</p>
        <p><strong>Stock:</strong> ${producto.stock}</p>
        <button ${producto.stock === 0 ? "disabled" : ""}>
            ${producto.stock === 0 ? "Sin stock" : "Agregar"}
        </button>
    `;

    const botonAgregar = article.querySelector("button");

    botonAgregar?.addEventListener("click", () => {
        agregarAlCarrito(producto);
        mostrarToast(`${producto.nombre} agregado al carrito 🛒`);
    });

    return article;
}

function actualizarResumen(titulo: string, cantidad: number): void {
    if (!catalogoResumen) return;

    catalogoResumen.textContent = `${titulo} · ${cantidad} producto(s)`;
}

function renderizarProductos(productos: Product[]): void {
    if (!contenedorProductos) return;

    contenedorProductos.innerHTML = "";

    productos.forEach((producto) => {
        const card = crearCardProducto(producto);
        contenedorProductos.appendChild(card);
    });
}

function filtrarPorCategoria(categoriaId: number): void {
    const productosFiltrados = PRODUCTS.filter((producto) =>
        producto.categorias.some((cat) => cat.id === categoriaId)
    );

    renderizarProductos(productosFiltrados);

    const categoria = getCategories().find(c => c.id === categoriaId);

    actualizarResumen(categoria?.nombre || "Categoría", productosFiltrados.length);
}

function buscarProductos(texto: string): void {
    const textoNormalizado = texto.toLowerCase().trim();

    const productosFiltrados = PRODUCTS.filter((producto) =>
        producto.nombre.toLowerCase().includes(textoNormalizado)
    );

    if (!contenedorProductos) return;

    if (productosFiltrados.length === 0) {
    contenedorProductos.innerHTML = "<p>No se encontraron productos.</p>";
    actualizarResumen("Resultados de búsqueda", 0);
    return;
}

    renderizarProductos(productosFiltrados);
    actualizarResumen("Resultados de búsqueda", productosFiltrados.length);
}

function renderizarCategorias(): void {
    if (!listaCategorias) return;

    const categorias = getCategories();

    listaCategorias.innerHTML = "";

    const liTodas = document.createElement("li");
    liTodas.textContent = "Todas";
    liTodas.addEventListener("click", () => {
        renderizarProductos(PRODUCTS);
        actualizarResumen("Todos los productos", PRODUCTS.length);
    });
    listaCategorias.appendChild(liTodas);

    categorias.forEach((categoria) => {
        const li = document.createElement("li");

        li.textContent = categoria.nombre;

        li.addEventListener("click", () => {
            filtrarPorCategoria(categoria.id);
        });

        listaCategorias.appendChild(li);
    });
}

if (searchInput) {
    searchInput.addEventListener("input", () => {
        buscarProductos(searchInput.value);
    });
}

renderizarProductos(PRODUCTS);
actualizarResumen("Todos los productos", PRODUCTS.length);
renderizarCategorias();