import { PRODUCTS, getCategories } from "../../../data/data";
import type { Product } from "../../../types/product";

const contenedorProductos = document.getElementById("contenedor-productos");
const listaCategorias = document.getElementById("lista-categorias");
const searchInput = document.getElementById("search-input") as HTMLInputElement | null;

function crearCardProducto(producto: Product): HTMLElement {
    const article = document.createElement("article");

    article.innerHTML = `
    <h3>${producto.nombre}</h3>
    <p>${producto.descripcion}</p>
    <p><strong>Precio:</strong> $${producto.precio}</p>
    <p><strong>Stock:</strong> ${producto.stock}</p>
    <button>Agregar</button>
  `;

    return article;
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
}

function buscarProductos(texto: string): void {
    const textoNormalizado = texto.toLowerCase().trim();

    const productosFiltrados = PRODUCTS.filter((producto) =>
        producto.nombre.toLowerCase().includes(textoNormalizado)
    );

    if (!contenedorProductos) return;

    if (productosFiltrados.length === 0) {
        contenedorProductos.innerHTML = "<p>No se encontraron productos.</p>";
        return;
    }

    renderizarProductos(productosFiltrados);
}

function renderizarCategorias(): void {
    if (!listaCategorias) return;

    const categorias = getCategories();

    listaCategorias.innerHTML = "";

    const liTodas = document.createElement("li");
    liTodas.textContent = "Todas";
    liTodas.addEventListener("click", () => {
        renderizarProductos(PRODUCTS);
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
renderizarCategorias();