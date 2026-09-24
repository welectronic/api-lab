# Convenciones

**Hereda:** `kit/estandares/seguridad.md` (el kit no tiene estándar Node/Express; mandan las convenciones del repo)
**Módulo de referencia:** `routes/sqliteRoutes.js` (forma de un router Express y cómo se monta en `app.js`). No se hizo T-000.

> Solo las **diferencias** con los estándares heredados y lo que un agente rompería sin darse cuenta.

## Estructura y nombres
- CommonJS (`require` / `module.exports`), no ESM.
- Routers en `routes/<nombre>Routes.js`, exportan `router`, se montan bajo `/api` en `app.js`.
- Comentarios en español, como el resto del repo.

## Tests (qué, dónde, cómo)
- Runner nativo `node --test`; archivos `tests/*.test.js`.
- `require('node:test')` y `require('node:assert/strict')`.
- Importar `../app`, nunca `../server`.

## Commits: `T-XXX: <descripción>`

## Dependencias permitidas
- Ninguna nueva en la oleada 1.
