# api-lab

API REST sencilla hecha con Node.js y Express que combina dos bases de datos:

- **MongoDB** (Mongoose): películas de la colección `movies` (base de ejemplo `sample_mflix`).
- **SQLite** (Sequelize): notas asociadas a cada película.

## Requisitos

- Node.js
- Una base de datos MongoDB (por ejemplo, MongoDB Atlas con `sample_mflix`)

## Instalación

```bash
npm install
```

Crea un archivo `.env` en la raíz:

```
MONGO_URI=tu_cadena_de_conexion_a_mongodb
PORT=3000
```

## Uso

```bash
npm start      # modo normal
npm run dev    # modo desarrollo con nodemon
```

El servidor queda disponible en `http://localhost:3000`.

## Endpoints

### Películas (MongoDB)

| Método | Ruta                          | Descripción                     |
|--------|-------------------------------|---------------------------------|
| GET    | `/api/movies`                 | Lista películas (máx. 50)       |
| GET    | `/api/movies/:id`             | Obtiene una película            |
| GET    | `/api/movies/:id/with-notes`  | Película junto con sus notas    |
| POST   | `/api/movies`                 | Crea una película               |
| PUT    | `/api/movies/:id`             | Actualiza una película          |
| DELETE | `/api/movies/:id`             | Elimina una película            |

### Notas (SQLite)

| Método | Ruta                          | Descripción                     |
|--------|-------------------------------|---------------------------------|
| GET    | `/api/notes`                  | Lista todas las notas           |
| GET    | `/api/notes/:id`              | Obtiene una nota                |
| GET    | `/api/notes/movie/:movieId`   | Notas de una película           |
| POST   | `/api/notes`                  | Crea una nota                   |
| PUT    | `/api/notes/:id`              | Actualiza una nota              |
| DELETE | `/api/notes/:id`              | Elimina una nota                |

Ejemplo para crear una nota:

```json
{
  "movieId": "573a1390f29313caabcd4135",
  "title": "Mi opinión",
  "content": "Una película excelente."
}
```
