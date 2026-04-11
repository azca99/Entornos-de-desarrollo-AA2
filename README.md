# Sports API

API REST para gestionar equipos deportivos y sus jugadores.

Permite realizar operaciones CRUD sobre equipos, así como validar relaciones con jugadores.

## Tecnologías

- Node.js
- Express
- Knex
- SQLite

## Estructura del proyecto

trabajo/
├── backend/
│   ├── src/
│   │   ├── configuration/
│   │   │   └── database.js
│   │   ├── controller/
│   │   │   └── teams.js
│   │   ├── route/
│   │   │   └── teams.js
│   │   ├── service/
│   │   │   └── teams.js
│   │   └── app.js
│   ├── package.json
│   ├── package-lock.json
│   ├── sports.db
│   └── sports.sqbpro
├── frontend/
│   ├── src/
│   │   ├── index.html
│   │   ├── style.css
│   │   └── server.js
│   ├── package.json
│   └── package-lock.json
├── .gitignore
└── README.md

### Organización general

- **backend/**: contiene la API REST, la lógica del servidor y la base de datos SQLite.
- **frontend/**: contiene la parte cliente del proyecto.
- **src/configuration/**: configuración de la conexión a la base de datos.
- **src/controller/**: controladores que gestionan las peticiones y respuestas.
- **src/route/**: definición de las rutas de la API.
- **src/service/**: acceso a datos y lógica de consulta sobre la base de datos.

## Testing

Se incluye una colección de Postman en:

docs/postman/sports-collection.json

Para usarla:
1. Importar en Postman
2. Configurar la URL base (http://localhost:3000)

### Variables de entorno en Postman

Variable: URL 
Valor: http://localhost:3000