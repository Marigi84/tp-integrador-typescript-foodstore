import { defineConfig } from "vite";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                index: "index.html",
                cliente: "cliente.html",
                admin: "admin.html",
                storeHome: "src/pages/store/home/home.html",
                storeCart: "src/pages/store/cart/cart.html",
            },
        },
    },
    base: "./",
});