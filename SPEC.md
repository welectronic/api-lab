# Especificación — el QUÉ y el PORQUÉ

Estado: aprobada (alcance dictado por el PO en el disparador) · Fecha: 2026-09-24

## Problema y usuarios
Quien opera o prueba la API (el PO, un balanceador, un monitor) no tiene forma de saber si el proceso está vivo sin tocar las bases de datos. Además, el repo no tiene tests. Esta iteración sirve sobre todo para **probar el flujo CHARTER** con un cambio mínimo.

## Historias de usuario (priorizadas)

### US1 — Comprobar que la API está viva (P1)
Como operador, quiero consultar un endpoint de salud para saber si el servicio responde.

- **Por qué esta prioridad:** es el cambio mínimo que ejercita todo el ciclo (rama, test, reporte, revisión, merge).
- **Prueba independiente:** un test automatizado que levanta la app sin bases de datos y consulta el endpoint.
- **Escenarios:**
  1. **Dado** el servicio en marcha, **cuando** hago `GET /api/health`, **entonces** recibo `200` con cuerpo JSON `{"status":"ok"}`.
  2. **Dado** que MongoDB y SQLite no están disponibles, **cuando** corro los tests, **entonces** el test de salud pasa igual.

### US2 — Saber que existe el endpoint (P2)
Como desarrollador que llega al repo, quiero ver el endpoint de salud documentado en el README junto a los demás.

- **Prueba independiente:** el README lista `GET /api/health` en una tabla de endpoints con un ejemplo de respuesta.

## Casos borde
- Endpoint de liveness, no de readiness: **no** consulta las BD. Responde `ok` aunque Mongo esté caído (decidido; ver Fuera de alcance).

## Requisitos funcionales
- **RF-001:** El sistema DEBE responder `GET /api/health` con estado `200`, `Content-Type` JSON y cuerpo exactamente `{"status":"ok"}`.
- **RF-002:** El repo DEBE tener un comando `npm test` que corra los tests con el runner nativo de Node, sin dependencias nuevas.
- **RF-003:** El README DEBE documentar `GET /api/health` (tabla de endpoints + ejemplo de respuesta).

## Criterios de éxito (medibles)
- **CE-001:** `npm test` pasa en `main` después del merge, sin MongoDB ni SQLite.
- **CE-002:** el ciclo completo (tarea → reporte → pre-revisión → revisión → merge) se cumple sin que ninguna IA haga merge ni PR.

## Supuestos
- Node ≥ 18 (fetch nativo y `node:test`). Verificado: Node 24.13.1 en el PC del PO.

## Fuera de alcance
- Readiness (estado de MongoDB/SQLite), versión, uptime u otros campos en la respuesta.
- Corregir las vulnerabilidades de dependencias existentes (D-3, backlog).
- Linters, formateador, gitleaks, Semgrep (backlog).

## Registro de aclaraciones
| Fecha | Pregunta | Respuesta del PO |
|---|---|---|
| 2026-09-24 | ¿Repo privado o público? | Público a propósito: es un laboratorio |
| 2026-09-24 | ¿Diagnóstico completo? | Se omite; se crean directamente T-001 y T-002 |
