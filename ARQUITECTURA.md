# Arquitectura — el CÓMO

> Repo existente: solo lo que cambia en esta iteración.

## Contratos entre módulos

### C-001 — `GET /api/health`
```
GET /api/health
→ 200 OK
  Content-Type: application/json; charset=utf-8
  {"status":"ok"}
```
- Router Express nuevo en `routes/healthRoutes.js` (`module.exports = router`), montado en `app.js` con `app.use('/api', healthRoutes)`, igual que los routers existentes.
- Sin acceso a BD, sin `async`, sin dependencias.

### C-002 — `npm test`
- `package.json` → `"scripts": { "test": "node --test" }`.
- Los tests viven en `tests/`. Importan `app` (no `server.js`, que conecta a las BD), hacen `app.listen(0)`, usan `fetch` nativo contra el puerto asignado y cierran el servidor al terminar.
- Comprobado por el LIDER (2026-09-24): `require('./app')` no abre conexiones; con `listen(0)` + `close()` el proceso termina solo.

## Modelo de amenazas (flujos sensibles)
Ningún flujo sensible en esta iteración. `GET /api/health` no recibe entrada, no lee datos y no expone versión, rutas ni estado interno.

| Flujo | Activo que protege | Quién podría atacarlo | Superficie de entrada | Control que lo mitiga | Test |
|---|---|---|---|---|---|
| `GET /api/health` | Información interna del servidor | Cualquier cliente anónimo | Ninguna (sin parámetros) | Cuerpo fijo `{"status":"ok"}`: no revela versión, BD ni trazas | `tests/health.test.js` compara el cuerpo exacto |

## Verificación contra principios
| Principio | ¿Se cumple? | Nota |
|---|---|---|
| 1. Cambio mínimo | Sí | 1 router, 1 línea en `app.js`, 1 script |
| 2. Sin dependencias nuevas | Sí | `node:test` + fetch nativo |
| 3. Tests sin BD | Sí | ver C-002 |
