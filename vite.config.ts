import { defineConfig } from "vite";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                index: "index.html",
                admin: "admin.html",
                storeHome: "src/pages/store/home/home.html",
                storeCart: "src/pages/store/cart/cart.html",
            },
        },
    },
    base: "./",
});