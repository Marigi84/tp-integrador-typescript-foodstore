import "./client.css";
import { categorias, productos } from "../../data/products";
import { getSession } from "../../utils/localStorage";
import { logoutUser } from "../../utils/auth";

const user = getSession();

if (!user) {
    window.location.href = "/";
} else if (user.rol !== "client") {
    window.location.href = "/admin.html";
}

const listaCategorias = document.getElementById("lista-categorias");
const contenedorProductos = document.getElementById("contenedor-productos");
const logoutBtn = document.querySelector<HTMLButtonElement>("#logout");

if (listaCategorias) {
    categorias.forEach((categoria) => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="#">${categoria}</a>`;
        listaCategorias.appendChild(li);
    });
}

if (contenedorProductos) {
    productos.forEach((producto) => {
        const article = document.createElement("article");
        article.classList.add("producto");

        article.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" width="150" />
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <p><strong>Precio:</strong> $${producto.precio}</p>
      <button>Agregar</button>
    `;

        const boton = article.querySelector("button");

        boton?.addEventListener("click", () => {
            alert("Agregaste: " + producto.nombre);
        });

        contenedorProductos.appendChild(article);
    });
}

logoutBtn?.addEventListener("click", () => {
    logoutUser();
    window.location.href = "/";
});