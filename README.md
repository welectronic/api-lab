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

Copia el archivo `.env.example` a `.env` y completa los valores:

Para bash:
```bash
cp .env.example .env
```

Para PowerShell:
```powershell
Copy-Item .env.example .env
```

## Uso

```bash
npm start      # modo normal
npm run dev    # modo desarrollo con nodemon
npm test       # corre los tests (no requiere bases de datos)
```

El servidor queda disponible en `http://localhost:3000`.

## Seguridad HTTP

- Cabeceras de protección en toda respuesta: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: no-referrer`.
- No se envía la cabecera `X-Powered-By`.
- Límite de `100kb` para el cuerpo de las peticiones (JSON y urlencoded), respondiendo `413` si se supera.

Cuerpos de error estándar (`Content-Type: application/json; charset=utf-8`):
- Ruta inexistente → 404 `{"error":"Recurso no encontrado"}`
- JSON malformado → 400 `{"error":"JSON malformado"}`
- Cuerpo de más de 100 kb → 413 `{"error":"Cuerpo demasiado grande"}`

## Endpoints

### Salud

| Método | Ruta                          | Descripción                     |
|--------|-------------------------------|---------------------------------|
| GET    | `/api/health`                 | Comprueba el estado de la API   |
| GET    | `/api/health/uptime`          | Obtiene el tiempo de actividad  |

Ejemplo de respuesta de `/api/health` (200 OK):

```json
{
  "status": "ok"
}
```

Ejemplo de respuesta de `/api/health/uptime` (200 OK):

```json
{
  "uptimeSeconds": 42
}
```

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
