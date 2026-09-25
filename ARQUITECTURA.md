# Arquitectura — el CÓMO

> Repo existente: solo lo que cambia en esta iteración.

## Supuestos y desconocidos
<!-- Un contrato no se libera si depende de un supuesto abierto (kit/metodologia/ANCLAJE.md). -->
| ID | Afirmación | Tipo | Cómo se verifica | Responsable | Afecta | Estado |
|---|---|---|---|---|---|---|
| — | C-001 a C-005 se contrataron antes del anclaje; su comportamiento está verificado por los tests integrados en `main` | — | — | — | — | — |
| S-001 | GitHub no deja abrir un PR entre `charter` (huérfana) y `main` porque no tienen historia común | HECHO (2026-09-25, PO: "main and charter are entirely different commit histories") | El PO intenta abrirlo en T-006 y guarda el mensaje | PO | T-006 (solo la forma de probar A8, no el contrato) | verificado |

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

### C-006 — CI de CHARTER (US5, T-006; consejo C-001, D-8)
Plantilla: `kit/configs/ci/charter-ci.yml`, adaptada a Node. Archivos: `.github/workflows/charter-ci.yml` y `.github/scripts/charter-guardia.sh`.

**Disparo y permisos**
- `on: pull_request` a `branches: [main]`. **Sin** `workflow_dispatch` ni `pull_request_target`.
- `permissions: contents: read`. Se mantiene la `concurrency` de la plantilla.

**Versiones fijas** [HECHO: `git ls-remote` y registros, 2026-09-25]
```
actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1   (node24)
actions/setup-node@820762786026740c76f36085b0efc47a31fe5020 # v7.0.0 (node24)
ghcr.io/gitleaks/gitleaks:v8.28.0@sha256:cdbb7c955abce02001a9f6c9f602fb195b7fadc1e812065883f695d1eeaba854
semgrep/semgrep:1.178.0@sha256:32e459968daabe7ab86968184a29109b9564aa00392401156f9788452b42786b
```
- Todo `actions/checkout` lleva `persist-credentials: false`.
- `setup-node` usa `node-version: 22`.

**Jobs.** Los id y los `name:` están congelados, porque el ruleset los busca por nombre exacto.

| id | `name:` (exacto) | Obligatorio | Falla cuando |
|---|---|---|---|
| `guardia` | `Guardia de ramas` | sí | lo decide `charter-guardia.sh` (abajo) |
| `secretos` | `Secretos (gitleaks)` | sí | gitleaks encuentra un secreto en los commits del PR (`--log-opts=BASE..HEAD`), con `--ignore-gitleaks-allow` además de las opciones de la plantilla |
| `sast` | `Análisis estático (Semgrep)` | sí | Semgrep `p/default` encuentra algo nuevo frente a `--baseline-commit BASE_SHA`, con `--disable-nosem` además de las opciones de la plantilla |
| `pruebas` | `Pruebas` | sí | `npm ci` o `npm test` fallan, **o** la salida de `npm test` no tiene `# tests N` con N ≥ 1. Los pasos no tienen `if:` |
| `dependencias` | `Dependencias vulnerables (informativo)` | no (`continue-on-error: true`) | `npm audit --audit-level=high` (informativo; D-3) |

**`charter-guardia.sh`** (bash, solo `git`/`grep`)
- Entrada: variables `HEAD_REF` y `BASE_SHA`. Corre desde la raíz del repo. Se puede correr en local: `HEAD_REF=<rama> BASE_SHA=<sha> bash .github/scripts/charter-guardia.sh`.
- Salida: exit 1 con `::error::` y la lista de archivos si se da alguna de estas condiciones:
  1. `HEAD_REF` = `charter`.
  2. `BASE_SHA` vacío: "no se puede verificar sin la base del PR".
  3. `git diff --name-only BASE_SHA...HEAD` trae alguna de estas rutas:
     - `^(tareas|reportes|revisiones|consejos|kit)/`;
     - un archivo de la raíz de `charter`: `ARQUITECTURA.md BITACORA.md CONVENCIONES.md DECISIONES.md DIAGNOSTICO.md LEEME.md PLAN.md PRINCIPIOS.md PROYECTO.md SPEC.md TABLERO.md TROPIEZOS.md` (exacto, en la raíz; `README.md` **no**);
     - un archivo llamado `.gitleaks.toml`, `.gitleaksignore` o `.semgrepignore` en cualquier ruta.
- En los demás casos, exit 0. Si el PR toca `.github/`, emite `::warning::` con la lista, y lo mismo si la rama no sigue `chr/T-XXX-<slug>`.

**Límite documentado (L-1).** Un PR que edita el propio workflow corre su versión editada y puede quedar en verde. Con una sola cuenta admin (D-5), ni CODEOWNERS ni el ruleset lo impiden. Control: en cada `revisar`, el LIDER lee completo el diff de `.github/` y lo anota en la revisión.

## Modelo de amenazas (flujos sensibles)
Oleada 1: ningún flujo sensible. Oleada 2 (E2): US3 es sensible (headers y entrada de usuario); T-005 es sensible porque toca la plantilla de secretos.

| Flujo | Activo que protege | Quién podría atacarlo | Superficie de entrada | Control que lo mitiga | Test |
|---|---|---|---|---|---|
| `GET /api/health` | Información interna del servidor | Cualquier cliente anónimo | Ninguna (sin parámetros) | Cuerpo fijo `{"status":"ok"}`: no revela versión, BD ni trazas | `tests/health.test.js` compara el cuerpo exacto |
| Respuestas de error y headers (US3) | Información interna (tecnología, stack, rutas) | Cualquier cliente anónimo | Toda petición: ruta, método, cuerpo | C-003: sin `X-Powered-By`, cuerpos de error fijos, headers de protección | `tests/http-hardening.test.js` |
| Parsers de body (US3) | Memoria y CPU del proceso | Cliente que envía cuerpos grandes o comprimidos | `POST`/`PUT` con JSON o urlencoded | Límite de 100 kb en ambos parsers (también tras descomprimir) → `413` | `tests/http-hardening.test.js` |
| `GET /api/health/uptime` (US4) | Información interna | Cliente anónimo | Ninguna | Solo un entero; sin versión, host ni fecha de arranque | `tests/health-uptime.test.js` |
| CI de PR (US5, T-006) | Integridad de `main`: sin secretos, sin sinks, sin pruebas en rojo ni archivos de coordinación | Agente o persona con escritura (la cuenta del PO) | El contenido del PR, incluidos el workflow y los archivos de supresión de los escáneres | C-006: versiones fijas por SHA y digest, token de solo lectura sin persistir, sin dispatch, guardia de raíz y de supresión, flags anti‑supresión; L-1 queda para la revisión | Casos A1–A9 de T-006 (PR en borrador) |
| `.env.example` / README (T-005) | Credenciales de MongoDB | Cualquiera que lea el repo público | Archivos versionados | Solo marcadores `<…>`; `.env` ignorado; push protection de GitHub | Revisión del LIDER + `git check-ignore .env` |

## Verificación contra principios
| Principio | ¿Se cumple? | Nota |
|---|---|---|
| 1. Cambio mínimo | Sí | 1 router, 1 línea en `app.js`, 1 script |
| 2. Sin dependencias nuevas | Sí | `node:test` + fetch nativo |
| 3. Tests sin BD | Sí | ver C-002 |
| 1–3 (oleada 2) | Sí | Express nativo; ningún archivo compartido entre T-003, T-004 y T-005 |
