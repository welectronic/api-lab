# Registro de decisiones

| # | Fecha | Decisión | Por qué | Alternativas descartadas | Aprobó | Estado |
|---|---|---|---|---|---|---|
| D-1 | 2026-09-24 | El repo queda público | Es un laboratorio | Privado | PO | vigente |
| D-2 | 2026-09-24 | El LIDER hace push con la credencial de Git del PO en su PC; sin token fine-grained | Laboratorio, un solo PC | Token limitado al repo | PO | vigente — revisar si deja de ser laboratorio |
| D-3 | 2026-09-24 | Las vulnerabilidades de dependencias ya existentes en `main` (1 critical, 14 high; directas: `mongoose`, `sequelize`, `sqlite3`) **no bloquean** la oleada 1, que no agrega dependencias. `npm audit` queda informativo con línea base en `PROYECTO.md` | Alcance de la prueba = flujo CHARTER; son preexistentes y ajenas a T-001/T-002 | Corregirlas antes (cambia el alcance de la prueba) | **Pendiente del PO** | propuesta |
| D-4 | 2026-09-24 | Se omiten el diagnóstico (Fase 1) y T-000 | Pedido del PO: prueba mínima | Diagnóstico delegado a SENIOR-2 | PO | vigente |
