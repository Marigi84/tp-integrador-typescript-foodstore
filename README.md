# 🍔 Food Store - TP Integrador TypeScript & Autenticación

## 📌 Descripción

Este proyecto corresponde al **Trabajo Práctico Integrador de Programación III**, cuyo objetivo es evolucionar una aplicación web dinámica ("Food Store") hacia un sistema con **autenticación, autorización por roles y persistencia de datos** utilizando **TypeScript y localStorage**.

La aplicación permite registrar usuarios, iniciar sesión y acceder a diferentes vistas según el rol (**admin** o **client**), protegiendo el acceso a rutas sensibles.

---

## 🎯 Objetivos del Proyecto

* Implementar autenticación basada en email y contraseña.
* Gestionar sesión de usuario con persistencia en `localStorage`.
* Aplicar autorización mediante roles (`admin` y `client`).
* Proteger rutas evitando accesos no permitidos.
* Utilizar TypeScript con tipado fuerte mediante interfaces.
* Organizar el proyecto en una arquitectura modular.

---

## 🛠️ Tecnologías Utilizadas

* TypeScript
* Vite
* HTML5
* CSS3
* localStorage (simulación de base de datos)

---

## 📁 Estructura del Proyecto

```text
src/
 ├── pages/
 │    ├── auth/
 │    │    ├── login/
 │    │    └── registro/
 │    ├── admin/
 │    └── client/
 │
 ├── utils/
 │    ├── auth.ts
 │    ├── localStorage.ts
 │    └── navigate.ts
 │
 ├── types/
 │    ├── IUser.ts
 │    └── Rol.ts
 │
 └── data/
      └── products.ts
```

---

## 🔐 Funcionalidades Principales

### ✅ Registro de usuarios

* Captura email y contraseña.
* Valida que no existan usuarios duplicados.
* Guarda los datos en `localStorage` bajo la clave `"users"`.

### ✅ Login

* Verifica credenciales contra los usuarios almacenados.
* Si son correctas, guarda la sesión en `"userData"`.

### ✅ Gestión de sesión

* Mantiene la sesión activa incluso al recargar la página.
* Permite cerrar sesión mediante botón de logout.

### ✅ Roles

* Los usuarios registrados tienen rol `client`.
* Existe un usuario administrador (`admin`) con acceso a panel de administración.

### ✅ Protección de rutas

* Se implementa un **guard centralizado** en `main.ts`.
* Un usuario sin sesión no puede acceder a páginas internas.
* Un usuario `client` no puede acceder a `/admin.html`.

---

## 👤 Accesos de prueba

### Administrador

* Email: `admin@foodstore.com`
* Contraseña: `admin123`

### Usuario cliente

* Se registra desde el formulario.

---

## 🛒 Funcionalidad Cliente

* Visualización de productos dinámicos.
* Carga de categorías.
* Interacción básica (botón "Agregar").

---

## ⚙️ Cómo ejecutar el proyecto

1. Clonar el repositorio:

```bash
git clone https://github.com/TU-USUARIO/TU-REPO.git
```

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar el servidor de desarrollo:

```bash
npm run dev
```

4. Abrir en el navegador:

```text
http://localhost:5173/
```

---

## 🧠 Conceptos Aplicados

* Tipado fuerte con interfaces (`IUser`, `Rol`).
* Persistencia de datos en cliente.
* Separación de responsabilidades (pages / utils / types).
* Autenticación y autorización en frontend.
* Protección lógica de rutas.

---

## 📌 Conclusión

Este proyecto permitió comprender la importancia de separar la lógica de seguridad de la interfaz visual, implementar autenticación real sin backend y preparar la base para futuras integraciones con APIs y bases de datos.

---

## 👩‍💻 Autora

Marina Giselle Cordero
Tecnicatura Universitaria en Programación - UTN
