import type { IProduct } from "../types/IProduct";

import bebidaImg from "../assets/bebida.jpg";
import hamburguesaImg from "../assets/hamburguesa.jpg";
import pizzaImg from "../assets/pizza.jpg";

export const categorias: string[] = ["Hamburguesas", "Pizzas", "Bebidas"];

export const productos: IProduct[] = [
    {
        id: 1,
        nombre: "Hamburguesa Clasica",
        descripcion: "Hamburguesa con carne, lechuga, tomate y queso",
        precio: 8000,
        imagen: hamburguesaImg,
        categoria: "Hamburguesas"
    },
    {
        id: 2,
        nombre: "Pizza Muzzarella",
        descripcion: "Pizza con masa fina y queso muzzarella",
        precio: 12000,
        imagen: pizzaImg,
        categoria: "Pizzas"
    },
    {
        id: 3,
        nombre: "Gaseosa Coca-Cola",
        descripcion: "Bebida gaseosa sabor cola",
        precio: 4000,
        imagen: bebidaImg,
        categoria: "Bebidas"
    },
    {
        id: 4,
        nombre: "Hamburguesa Doble",
        descripcion: "Hamburguesa con dos carnes, lechuga, tomate y queso",
        precio: 10000,
        imagen: hamburguesaImg,
        categoria: "Hamburguesas"
    }
];