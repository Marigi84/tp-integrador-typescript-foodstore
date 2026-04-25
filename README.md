# 🍔 Food Store - Parcial Programación III

## 📌 Descripción
Este proyecto corresponde al Primer Parcial de Programación III, donde se continúa la evolución de la aplicación web "Food Store".

La aplicación permite a los usuarios registrarse, iniciar sesión y acceder a un catálogo dinámico de productos. Además, incorpora funcionalidades de búsqueda, filtrado por categorías y un carrito de compras con persistencia en localStorage.

---

## 🎯 Objetivos del Proyecto
- Implementar un catálogo dinámico de productos.
- Permitir la búsqueda de productos por nombre.
- Filtrar productos por categoría.
- Desarrollar un carrito de compras con persistencia en localStorage.
- Mostrar productos, cantidades y total en el carrito.
- Mantener autenticación y control de acceso por roles.
- Aplicar buenas prácticas de organización y uso de TypeScript.

---

## 🛠️ Tecnologías Utilizadas
- TypeScript
- Vite
- HTML5
- CSS3
- Manipulación del DOM
- localStorage (persistencia de datos)

---

## 📁 Estructura del Proyecto

src/
├── pages/
│ ├── auth/
│ │ ├── login/
│ │ └── registro/
│ ├── admin/
│ └── store/
│ ├── home/
│ └── cart/
│
├── utils/
│ ├── auth.ts
│ ├── cart.ts
│ ├── localStorage.ts
│ └── navigate.ts
│
├── types/
│ ├── IUser.ts
│ ├── Rol.ts
│ ├── product.ts
│ └── cartItem.ts
│
├── data/
│ └── data.ts
│
└── style.css


---

## 🔐 Funcionalidades Principales

### ✅ Registro de usuarios
- Captura nombre, email y contraseña.
- Valida datos ingresados.
- Guarda los usuarios en localStorage.

### ✅ Login
- Verifica credenciales.
- Guarda la sesión en localStorage.
- Redirige según el rol del usuario.

### ✅ Gestión de sesión
- Mantiene sesión activa.
- Permite cerrar sesión (logout).

### ✅ Roles
- Usuario `client`: acceso al catálogo y carrito.
- Usuario `admin`: acceso al panel de administración.

### ✅ Protección de rutas
- Control de acceso mediante guard.
- Redirección automática si el usuario no tiene permisos.

---

## 🛒 Carrito de Compras
- Permite agregar productos desde el catálogo.
- Si el producto ya existe, incrementa su cantidad.
- Permite:
  - Incrementar o disminuir cantidad
  - Eliminar productos
  - Vaciar carrito
- Calcula y muestra el total de la compra.
- Persistencia en localStorage.

---

## 🔍 Búsqueda y Filtros
- Búsqueda en tiempo real por nombre.
- Filtrado por categoría.
- Actualización dinámica del catálogo.

---

## 🧑‍💻 Funcionalidad Cliente
- Visualización de productos dinámicos.
- Búsqueda por nombre.
- Filtrado por categoría.
- Agregar productos al carrito.
- Gestión completa del carrito.

---

## 👤 Accesos de prueba

### Administrador
- Email: admin@foodstore.com  
- Contraseña: admin123  

### Cliente
- Se registra desde el formulario.

---

## ⚙️ Cómo ejecutar el proyecto

1. Clonar el repositorio:

```bash
git clone https://github.com/TU-USUARIO/TU-REPO.git
Instalar dependencias:
npm install
Ejecutar el servidor:
npm run dev
Abrir en el navegador:
http://localhost:5173/
🧠 Conceptos Aplicados
Tipado fuerte con TypeScript.
Manipulación dinámica del DOM.
Persistencia de datos con localStorage.
Separación de responsabilidades (pages, utils, types).
Autenticación y autorización en frontend.
Protección de rutas.
📌 Conclusión

Este proyecto permitió consolidar conceptos fundamentales de desarrollo frontend, incorporando interacción con el usuario, persistencia de datos y control de acceso.

Se logró evolucionar una aplicación estática hacia una aplicación dinámica e interactiva, sentando las bases para futuras integraciones con backend.

👩‍💻 Autora

Marina Giselle Cordero
Tecnicatura Universitaria en Programación - UTN
