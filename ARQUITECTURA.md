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

### C-003 — Endurecimiento HTTP (US3, T-003)
Todo en `app.js`, con Express nativo (sin dependencias):
1. `app.disable('x-powered-by')`.
2. Middleware **antes** de los parsers que fija en toda respuesta:
   `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: no-referrer`.
3. Parsers con límite: `express.json({ limit: '100kb' })` y `express.urlencoded({ extended: true, limit: '100kb' })`. No se agregan parsers nuevos.
4. Después de montar **todos** los routers: manejador 404 y luego manejador de errores de body.

Cuerpos de error (exactos, `Content-Type: application/json; charset=utf-8`). **Ampliado el 2026-09-24 (D-7):** cubre todo error de body-parser, no solo dos tipos.
```
Ruta inexistente (cualquier método)                → 404 {"error":"Recurso no encontrado"}
Error de body-parser: typeof err.type === 'string' y 400 <= err.status <= 499, se responde con err.status:
  400 y err.type === 'entity.parse.failed'         → 400 {"error":"JSON malformado"}
  413 (entity.too.large, parameters.too.many)      → 413 {"error":"Cuerpo demasiado grande"}
  415 (encoding o charset no soportado)            → 415 {"error":"Tipo de contenido no soportado"}
  cualquier otro 4xx de body                       → err.status {"error":"Petición inválida"}
```
- El cuerpo nunca incluye stack, `err.message`, `err.type`, la ruta pedida ni nombres de archivos o librerías.
- Cualquier otro error (sin `err.type` de body-parser, o 5xx) sigue su camino con `next(err)`: dejar de exponer `err.message` en general es de E3.
- Todos los casos llevan los headers del punto 2 y no llevan `X-Powered-By`.

### C-004 — `GET /api/health/uptime` (US4, T-004)
```
GET /api/health/uptime
→ 200 OK
  Content-Type: application/json; charset=utf-8
  {"uptimeSeconds": <entero ≥ 0>}   // Math.floor(process.uptime())
```
- Ruta nueva en el router existente `routes/healthRoutes.js` (`router.get('/health/uptime', …)`). No se toca `app.js`: el router ya está montado en `/api`.
- Sin BD, sin `async`, sin otros campos.

### C-005 — Documentación y `.env.example` (US3, US4, T-005)
- `README.md` documenta C-003 y C-004: headers, límite, **status y cuerpo** de cada error de C-003 con una descripción para usuarios, y el endpoint de uptime con ejemplo. **No** copia `err.type`, `err.status` ni nombres de librerías: son notas de implementación.
- `.env.example` en la raíz, con exactamente estas claves y valores de marcador:
```
MONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>/<base>
PORT=3000
```
- `.env` sigue en `.gitignore`.

## Modelo de amenazas (flujos sensibles)
Oleada 1: ningún flujo sensible. Oleada 2 (E2): US3 es sensible (headers y entrada de usuario); T-005 es sensible porque toca la plantilla de secretos.

| Flujo | Activo que protege | Quién podría atacarlo | Superficie de entrada | Control que lo mitiga | Test |
|---|---|---|---|---|---|
| `GET /api/health` | Información interna del servidor | Cualquier cliente anónimo | Ninguna (sin parámetros) | Cuerpo fijo `{"status":"ok"}`: no revela versión, BD ni trazas | `tests/health.test.js` compara el cuerpo exacto |
| Respuestas de error y headers (US3) | Información interna (tecnología, stack, rutas) | Cualquier cliente anónimo | Toda petición: ruta, método, cuerpo | C-003: sin `X-Powered-By`, cuerpos de error fijos, headers de protección | `tests/http-hardening.test.js` |
| Parsers de body (US3) | Memoria y CPU del proceso | Cliente que envía cuerpos grandes o comprimidos | `POST`/`PUT` con JSON o urlencoded | Límite de 100 kb en ambos parsers (también tras descomprimir) → `413` | `tests/http-hardening.test.js` |
| `GET /api/health/uptime` (US4) | Información interna | Cliente anónimo | Ninguna | Solo un entero; sin versión, host ni fecha de arranque | `tests/health-uptime.test.js` |
| `.env.example` / README (T-005) | Credenciales de MongoDB | Cualquiera que lea el repo público | Archivos versionados | Solo marcadores `<…>`; `.env` ignorado; push protection de GitHub | Revisión del LIDER + `git check-ignore .env` |

## Verificación contra principios
| Principio | ¿Se cumple? | Nota |
|---|---|---|
| 1. Cambio mínimo | Sí | 1 router, 1 línea en `app.js`, 1 script |
| 2. Sin dependencias nuevas | Sí | `node:test` + fetch nativo |
| 3. Tests sin BD | Sí | ver C-002 |
| 1–3 (oleada 2) | Sí | Express nativo; ningún archivo compartido entre T-003, T-004 y T-005 |
