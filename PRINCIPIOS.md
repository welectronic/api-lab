# Principios del proyecto

Reglas que **no se negocian**. Toda arquitectura, tarea y revisión se verifica contra ellas. Una excepción solo es válida si se justifica en `DECISIONES.md` y el PO la aprueba.

## 1. Cambio mínimo
Cada tarea hace solo lo que pide y toca solo sus archivos permitidos. Nada de refactors "de paso".

## 2. Ninguna dependencia nueva sin aprobación
Toda dependencia nueva requiere autorización explícita en la tarea. En la oleada 1 no hay ninguna.

## 3. Los tests no requieren bases de datos
`npm test` corre sin MongoDB ni SQLite; los tests importan `app`, nunca `server.js`.

## Seguridad y datos
- Se aplica `kit/estandares/seguridad.md`. Nivel OWASP ASVS: **2**.
- Una vulnerabilidad verificada bloquea la entrega; solo el PO puede diferirla, por escrito en `DECISIONES.md`.
- Repo público: nada de secretos, datos reales ni información interna en ninguna rama, incluida `charter`.

## Calidad y pruebas
- Todo endpoint nuevo tiene su test en `tests/`.

---
Versión: 1.0 · Aprobada por el PO: 2026-09-24 (alcance del disparador) · Última enmienda: 2026-09-24
