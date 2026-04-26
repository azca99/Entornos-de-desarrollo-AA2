# Sports API / aplicación de equipos y jugadores

Este proyecto es una aplicación web sencilla hecha para gestionar equipos deportivos y jugadores.

La idea es que haya una parte de backend, que funciona como API REST, y una parte de frontend, que es la que usa el usuario desde el navegador.

Con la aplicación se pueden hacer operaciones CRUD completas sobre equipos y jugadores, y además los jugadores están relacionados con un equipo.


### Backend
- Node.js
- Express
- Knex
- SQLite
- express-validator

### Frontend
- HTML
- JavaScript
- Bootstrap
- Axios
- Toastify


## Qué hace la aplicación

Ahora mismo permite:

- crear equipos
- ver equipos
- modificar equipos
- eliminar equipos
- crear jugadores
- ver jugadores
- modificar jugadores
- eliminar jugadores
- relacionar jugadores con equipos
- validar datos en backend con 'express-validator'
- validar en frontend algunos datos básicos
- mostrar mensajes de éxito y error
- guardar una imagen de equipo mediante una URL
- actualizar o eliminar solo la imagen de un equipo desde la API


## Cómo ponerla en marcha

### 1) Clonar el repositorio

bash
git clone <url-del-repositorio>
cd trabajo

### 2) Instalar dependencias del backend

bash
cd backend
npm install

### 3) Instalar dependencias del frontend

bash
cd ../frontend
npm install


## Cómo arrancarlo

### Backend

Desde la carpeta 'backend':

bash
npm start / npm run dev

Si no estuviera configurado el script de inicio, se puede arrancar también con:

bash
node src/app.js

La API funciona en:

text
http://localhost:3000

### Frontend

El frontend está hecho con HTML y JavaScript, así que se puede abrir desde el navegador o servir como se haya hecho en clase.

En cualquier caso, el frontend consume la API del backend en esta dirección:

text
http://localhost:3000


## Rutas principales de la API

### Equipos

- 'GET /teams'  
  Devuelve todos los equipos

- 'GET /teams/:id'  
  Devuelve un equipo por su id

- 'POST /teams'  
  Registra un equipo nuevo

- 'PUT /teams/:id'
  Modifica un equipo

- 'DELETE /teams/:id'
  Elimina un equipo

- 'PUT /teams/:id/image'
  Actualiza solo la imagen del equipo

- 'DELETE /teams/:id/image'  
  Elimina solo la imagen del equipo

### Jugadores

- 'GET /players'
  Devuelve todos los jugadores

- 'GET /players/:id'  
  Devuelve un jugador por su id

- 'GET /players/search?name=...'  
  Busca jugadores por nombre

- 'POST /players'
  Registra un jugador nuevo

- 'PUT /players/:id'  
  Modifica un jugador

- 'DELETE /players/:id'  
  Elimina un jugador


## Ejemplos de datos

### Ejemplo para crear un equipo

json
{
  "name": "Real Zaragoza",
  "city": "Zaragoza",
  "sport": "Futbol",
  "image_url": "https://ejemplo.com/escudo.png"
}

### Ejemplo para crear un jugador

json
{
  "name": "Leo Messi",
  "birth_date": "10-05-1975",
  "position": "Delantero",
  "id_team": 1
}


## Validaciones

En el backend se ha añadido validación usando 'express-validator'.

Se comprueban cosas como:

- campos obligatorios
- ids válidos
- formato de fecha en jugadores
- que la URL de imagen sea válida si se rellena

Además, en el frontend también se comprueba la URL de la imagen antes de enviar el formulario, para que el usuario vea el error antes.


## Sobre los mensajes al usuario

La aplicación muestra notificaciones con Toastify.

En los casos de crear y modificar, como después se vuelve al listado, el mensaje se guarda temporalmente y se muestra al cargar la página de destino.

Así el usuario sí puede ver el mensaje correctamente.


## Sobre la relación entre equipos y jugadores

Los jugadores pertenecen a un equipo.

Por eso, si un equipo tiene jugadores asociados, no se puede eliminar directamente. En ese caso la API devuelve un mensaje de error indicando lo que ocurre.


## Imágenes

No se ha hecho subida real de archivos.

Lo que se ha implementado es el trabajo con imágenes mediante una URL guardada en 'image_url'.

Eso permite:

- guardar una imagen al crear un equipo
- modificar la imagen al editar un equipo
- actualizar solo la imagen desde la API
- eliminar solo la imagen desde la API
- mostrar la imagen en el listado de equipos


## Pruebas de la API

Se incluye una colección de Postman para probar los endpoints.

La idea es:

1. importar la colección
2. configurar la variable 'URL'
3. poner este valor:

'http://localhost:3000'

## Algunas cosas que podrían mejorarse más adelante

- permitir subida real de imágenes
- mejorar un poco más el diseño visual
- ampliar la validación del frontend
- documentar todavía más la API en la wiki del repositorio


## Sumario

Es una aplicación sencilla de gestión de equipos y jugadores con:

- backend REST
- base de datos SQLite
- frontend con HTML y JavaScript
- validaciones
- mensajes visuales
- relación entre entidades
- soporte básico para imágenes