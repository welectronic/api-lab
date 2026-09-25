# Especificación — el QUÉ y el PORQUÉ

Estado: E1 entregada; E2 aceptada; E3 con US5 integrada y el resto en backlog (prueba 3 cerrada, 2026-09-25) · Fecha: 2026-09-25

## Problema y usuarios
Quien opera o prueba la API (el PO, un balanceador, un monitor) necesita saber si el servicio está vivo y desde cuándo, sin tocar las bases de datos. La API es pública (laboratorio) y hoy responde con los valores por defecto de Express: anuncia la tecnología, no envía headers de protección y devuelve errores en HTML. Además, el proyecto sirve para **probar el flujo CHARTER**.

## Épicas
| ID | Épica | Comprometida | Entregada | Aceptada |
|---|---|---|---|---|
| E1 | Prueba del flujo CHARTER: endpoint de salud (US1, US2) | — | 2026-09-25 | — |
| E2 | Endurecimiento y observabilidad (US3, US4) | 2026-10-01 | 2026-09-24 | 2026-09-24 |
| E3 | Seguridad continua (backlog de `PLAN.md`) | — | — | — |

- **E1** se registró después de terminada para que sus historias tengan épica; sus tareas se integraron el 2026-09-24. Entregada el 2026-09-25 (PO); `Aceptada` se llena cuando el cliente la acepte.
- **E2** = las 3 tareas de la prueba 2: endurecimiento HTTP, uptime y su documentación. La documentación va dentro de US3 y US4.
- **E3** no tiene fecha comprometida. US5 (CI de CHARTER) la dictó el PO el 2026-09-25 como primera tarea de la prueba 3; el resto sigue en `PLAN.md` → Backlog.

## Historias de usuario (priorizadas)

### US1 — Comprobar que la API está viva (P1) [E1]
Como operador, quiero consultar un endpoint de salud para saber si el servicio responde.

- **Por qué esta prioridad:** es el cambio mínimo que ejercita todo el ciclo (rama, test, reporte, revisión, merge).
- **Prueba independiente:** un test automatizado que levanta la app sin bases de datos y consulta el endpoint.
- **Escenarios:**
  1. **Dado** el servicio en marcha, **cuando** hago `GET /api/health`, **entonces** recibo `200` con cuerpo JSON `{"status":"ok"}`.
  2. **Dado** que MongoDB y SQLite no están disponibles, **cuando** corro los tests, **entonces** el test de salud pasa igual.

### US2 — Saber que existe el endpoint (P2) [E1]
Como desarrollador que llega al repo, quiero ver el endpoint de salud documentado en el README junto a los demás.

- **Prueba independiente:** el README lista `GET /api/health` en una tabla de endpoints con un ejemplo de respuesta.

### US3 — Endurecer HTTP y 404 (P1) [E2]
Como responsable de una API pública, quiero que el servicio no revele su tecnología, envíe headers de protección básicos, rechace cuerpos demasiado grandes y responda las rutas inexistentes en JSON sin detalles internos, para reducir la superficie de ataque. Como desarrollador, quiero ver ese comportamiento documentado y un ejemplo de configuración sin secretos.

- **Por qué esta prioridad:** la API es pública (D-1) y hoy expone `X-Powered-By` y errores HTML de Express. Es lo que justifica el "endurecimiento" de E2.
- **Prueba independiente:** tests automatizados sin bases de datos que revisan headers, límite de tamaño y 404, más la lectura del README y de `.env.example`.
- **Seguridad:** `sensible` (headers, configuración HTTP y entrada del usuario). Lleva casos de abuso con test.
- **Escenarios:**
  1. **Dado** el servicio en marcha, **cuando** hago cualquier petición (incluida una que termine en 404 o 413), **entonces** la respuesta **no** incluye `X-Powered-By` e incluye `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY` y `Referrer-Policy: no-referrer`.
  2. **Dado** un `POST` con cuerpo de más de 100 kb, JSON o `application/x-www-form-urlencoded`, **cuando** llega a la API, **entonces** recibo `413` con cuerpo JSON, sin stack trace ni rutas internas.
  3. **Dado** una ruta que no existe (ej. `GET /api/no-existe` o `GET /`), **cuando** la consulto, **entonces** recibo `404` con cuerpo JSON y un mensaje genérico, sin stack trace ni la ruta pedida reflejada como HTML.
  4. **Dado** un cuerpo JSON de hasta 100 kb, **cuando** llega a un endpoint existente, **entonces** se procesa como antes (el límite no rompe lo que ya funciona).
  5. **Dado** que llego al repo, **cuando** leo el README, **entonces** encuentro los headers que envía la API, el límite de 100 kb con su `413`, el formato del `404` y cómo crear `.env` a partir de `.env.example`.
  6. **Dado** el repo, **cuando** abro `.env.example`, **entonces** contiene `MONGO_URI` y `PORT` sin valores reales.
  7. **Dado** un `POST` con JSON malformado, **cuando** llega a la API, **entonces** recibo `400` con cuerpo JSON y un mensaje genérico, sin stack trace.
  8. **Dado** cualquier otro cuerpo que el parser rechace (más de 1000 parámetros, `Content-Encoding` o charset no soportados), **cuando** llega a la API, **entonces** recibo su status (`413`, `415` u otro 4xx) con cuerpo JSON genérico, sin stack trace ni rutas internas.

### US4 — Uptime del servicio (P2) [E2]
Como operador, quiero saber cuánto tiempo lleva el servicio en marcha, para detectar reinicios inesperados. Como desarrollador, quiero verlo documentado junto al endpoint de salud.

- **Por qué esta prioridad:** es la parte de "observabilidad" de E2 y depende solo del proceso, no de las bases de datos.
- **Prueba independiente:** un test sin bases de datos que consulta el endpoint y valida el tipo y el rango del valor.
- **Seguridad:** `normal` (no recibe entrada ni expone datos internos, aparte de un número).
- **Escenarios:**
  1. **Dado** el servicio en marcha, **cuando** hago `GET /api/health/uptime`, **entonces** recibo `200` con cuerpo JSON `{"uptimeSeconds": <entero ≥ 0>}`.
  2. **Dado** que consulto dos veces con al menos 1 segundo de diferencia, **cuando** comparo los valores, **entonces** el segundo no es menor que el primero.
  3. **Dado** que MongoDB y SQLite no están disponibles, **cuando** corro los tests, **entonces** el test de uptime pasa igual.
  4. **Dado** que llego al repo, **cuando** leo el README, **entonces** `GET /api/health/uptime` aparece en la tabla de salud con un ejemplo de respuesta.

### US5 — Ningún PR indebido llega a `main` (P1) [E3]
Como PO, quiero que GitHub no deje integrar a `main` un PR con secretos, hallazgos de análisis estático, pruebas en rojo o sin pruebas, o archivos de coordinación de CHARTER, para no depender solo de la revisión.

- **Por qué esta prioridad:** es la capa 0 de las guardas (`kit/metodologia/GUARDAS.md`) y un ítem de la Fase 0 pendiente desde el kit del 2026-09-26.
- **Prueba independiente:** PR de abuso en borrador, uno por caso, que deben fallar en el check indicado; el PR de la tarea debe pasar.
- **Seguridad:** `sensible` (control de seguridad, cadena de suministro).
- **Escenarios:**
  1. **Dado** un PR a `main` limpio, **cuando** corre el CI, **entonces** pasan `Guardia de ramas`, `Secretos (gitleaks)`, `Análisis estático (Semgrep)` y `Pruebas`.
  2. **Dado** un PR con archivos de coordinación (carpetas o `.md` de la raíz de `charter`) o archivos que suprimen escáneres, **cuando** corre el CI, **entonces** falla `Guardia de ramas`.
  3. **Dado** un PR con un secreto, aunque lleve `gitleaks:allow`, **cuando** corre el CI, **entonces** falla `Secretos (gitleaks)`.
  4. **Dado** un PR con código que Semgrep marca, aunque lleve `nosemgrep`, **cuando** corre el CI, **entonces** falla `Análisis estático (Semgrep)`.
  5. **Dado** un PR con una prueba en rojo o sin ninguna prueba, **cuando** corre el CI, **entonces** falla `Pruebas`.
  6. **Dado** que se integra el PR, **cuando** el PO marca los 4 checks como obligatorios en `proteger-main`, **entonces** un PR con un check en rojo no se puede integrar sin bypass.

## Casos borde
- `/api/health` es un endpoint de liveness, no de readiness: **no** consulta las BD. Responde `ok` aunque Mongo esté caído.
- El uptime cuenta desde que arrancó el proceso y vuelve a 0 tras un reinicio. Se redondea hacia abajo: nunca es decimal ni negativo.
- Un 404 o 413 también lleva los headers de US3.
- JSON malformado: entra en US3 como `400` JSON sin stack (US3 escenario 7). El resto de errores (dejar de devolver `err.message`) queda para E3.
- El límite de 100 kb aplica a todo parser de body que use la app (hoy JSON y urlencoded). No se agregan parsers nuevos.

## Requisitos funcionales
- **RF-001:** El sistema DEBE responder `GET /api/health` con estado `200`, `Content-Type` JSON y cuerpo exactamente `{"status":"ok"}`.
- **RF-002:** El repo DEBE tener un comando `npm test` que corra los tests con el runner nativo de Node, sin dependencias nuevas.
- **RF-003:** El README DEBE documentar `GET /api/health` (tabla de endpoints + ejemplo de respuesta).
- **RF-004:** El sistema NO DEBE enviar `X-Powered-By` y DEBE enviar `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY` y `Referrer-Policy: no-referrer` en todas las respuestas. *(US3)*
- **RF-005:** El sistema DEBE rechazar cuerpos de más de 100 kb (JSON y urlencoded) con `413`, JSON malformado con `400`, y cualquier otro cuerpo que el parser rechace con su status 4xx (ej. `415`), siempre con cuerpo JSON sin stack. *(US3)*
- **RF-006:** El sistema DEBE responder las rutas inexistentes con `404` y cuerpo JSON con un mensaje genérico, sin stack ni detalles internos. *(US3)*
- **RF-007:** El README DEBE documentar RF-004 a RF-006, y el repo DEBE incluir `.env.example` con `MONGO_URI` y `PORT` sin valores reales. *(US3)*
- **RF-008:** El sistema DEBE responder `GET /api/health/uptime` con `200` y `{"uptimeSeconds": <entero ≥ 0>}` calculado como `Math.floor(process.uptime())`, sin consultar las BD. *(US4)*
- **RF-009:** El README DEBE documentar `GET /api/health/uptime` con un ejemplo de respuesta. *(US4)*
- **RF-010:** Todo PR a `main` DEBE pasar por el CI de C-006, y sus 4 checks bloqueantes DEBEN fallar en los casos de abuso de T-006. *(US5)*
- Todos los cambios de E2 se hacen **sin dependencias nuevas**.

## Criterios de éxito (medibles)
- **CE-001:** `npm test` pasa en `main` después del merge, sin MongoDB ni SQLite.
- **CE-002:** el ciclo completo (tarea → reporte → pre-revisión → revisión → merge) se cumple sin que ninguna IA haga merge ni PR.
- **CE-003:** E2 está integrada en `main` a más tardar el 2026-10-01.
- **CE-004:** los casos de abuso de US3 tienen test y pasan en `main`.

## Supuestos
- Node ≥ 18 (fetch nativo y `node:test`). Verificado: Node 24.13.1 en el PC del PO.

## Fuera de alcance
- Readiness (estado de MongoDB/SQLite), versión u otros campos en las respuestas de salud.
- `Content-Security-Policy` y `Strict-Transport-Security`: no se piden en E2 (la API no sirve HTML y no hay TLS en local). Se revisan en E3.
- Todo lo de E3: dependencias vulnerables (D-3), gitleaks/Semgrep/CI, `err.message` en los endpoints existentes, `database.sqlite` versionado y logs de peticiones.

## Registro de aclaraciones
| Fecha | Pregunta | Respuesta del PO |
|---|---|---|
| 2026-09-24 | ¿Repo privado o público? | Público a propósito: es un laboratorio |
| 2026-09-24 | ¿Diagnóstico completo? | Se omite; se crean directamente T-001 y T-002 |
| 2026-09-24 | ¿Qué entra en E2? | Las 3 tareas de la prueba 2: endurecimiento HTTP, uptime y su documentación. US3 y US4, con la documentación dentro de cada historia. Mis recomendaciones pasan a E3 "Seguridad continua", sin fecha |
| 2026-09-24 | ¿El límite de 100 kb aplica a urlencoded? | Sí: a todo parser de body que use la app. No agregar parsers nuevos |
| 2026-09-24 | ¿JSON malformado en US3 o E3? | US3: 400 JSON sin stack, en el mismo manejador que el 413. `err.message` general queda para E3 |
| 2026-09-24 | ¿Uptime de qué? | Del proceso: `Math.floor(process.uptime())` |
| 2026-09-24 | Hallazgo 1 de T-003-r1 (otros errores de body filtran el stack): ¿corregir o diferir? | A: corregir en ronda 2 de T-003 y T-005 (D-7) |
