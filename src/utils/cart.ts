import type { Product } from "../types/product";
import type { CartItem } from "../types/cartItem";

const CART_KEY = "cart";

export function obtenerCarrito(): CartItem[] {
    const carritoGuardado = localStorage.getItem(CART_KEY);

    if (!carritoGuardado) {
        return [];
    }

    return JSON.parse(carritoGuardado) as CartItem[];
}

export function guardarCarrito(carrito: CartItem[]): void {
    localStorage.setItem(CART_KEY, JSON.stringify(carrito));
}

export function agregarAlCarrito(producto: Product): void {
    const carrito = obtenerCarrito();

    const itemExistente = carrito.find(
        (item) => item.product.id === producto.id
    );

    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({
            product: producto,
            cantidad: 1,
        });
    }

    guardarCarrito(carrito);
}

export function incrementarCantidad(productId: number): void {
    const carrito = obtenerCarrito();

    const item = carrito.find((i) => i.product.id === productId);

    if (item) {
        item.cantidad += 1;
    }

    guardarCarrito(carrito);
}

export function disminuirCantidad(productId: number): void {
    let carrito = obtenerCarrito();

    carrito = carrito
        .map((item) => {
            if (item.product.id === productId) {
                item.cantidad -= 1;
            }
            return item;
        })
        .filter((item) => item.cantidad > 0);

    guardarCarrito(carrito);
}

export function eliminarProducto(productId: number): void {
    const carrito = obtenerCarrito().filter(
        (item) => item.product.id !== productId
    );

    guardarCarrito(carrito);
}

export function vaciarCarrito(): void {
    localStorage.removeItem(CART_KEY);
}