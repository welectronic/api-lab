---
tarea: T-006
ronda: 1
autor: SENIOR-2
herramienta_modelo: Antigravity / Gemini 3.1 Pro (High)
tipo: pruebas
estado: listo_para_revision
rama: chr/T-006-ci
commit: N/A
fecha: 2026-09-25
inicio: 2026-09-25 02:14
fin: 2026-09-25 02:43
sesiones: 2
---

# Reporte T-006 — Pruebas y relevo

## Entrega 1: Matriz de abuso y verificación de herramientas

### Matriz de casos de abuso

| # | Rama | Receta | Check que debe fallar | Los demás checks bloqueantes |
|---|---|---|---|---|
| A1 | `chr/T-006-abuso-kit` | Agrega `kit/ABUSO.md` | `Guardia de ramas` | pasan |
| A2 | `chr/T-006-abuso-raiz` | Agrega `TABLERO.md` en la raíz | `Guardia de ramas` | pasan |
| A3 | `chr/T-006-abuso-secreto` | Agrega `abuso/secreto.txt` con un `generic-api-key` sintético de 32 caracteres. | `Secretos (gitleaks)` | pasan |
| A4 | `chr/T-006-abuso-suprime` | Agrega `abuso/secreto_allow.txt` con el mismo tipo de secreto y el texto `# gitleaks:allow` en la misma línea. | `Secretos (gitleaks)` | pasan |
| A5 | `chr/T-006-abuso-semgrep` | Agrega `abuso/sink.js` con un patrón inseguro de `child_process.exec` y el comentario `// nosemgrep` en la misma línea. | `Análisis estático (Semgrep)` | pasan |
| A6 | `chr/T-006-abuso-rojo` | Agrega `tests/abuso-rojo.test.js` con un test fallido (`assert.equal(1,2)`). | `Pruebas` | pasan |
| A7 | `chr/T-006-abuso-vacio` | Borra todos los `tests/*.test.js` | `Pruebas` | pasan |
| A9 | `chr/T-006-abuso-ignora` | Agrega `.gitleaksignore` y `.semgrepignore` en la raíz con un comentario de prueba. | `Guardia de ramas`, con ambos en el `::error::` | pasan |
| A8 | `charter` | PR contra main | GitHub lo rechaza, la guardia sale con 1 | — |
| Limpio | `chr/T-006-ci` | El PR de la tarea | ninguno | pasan (guardia avisa por .github/) |

### Verificación local de herramientas

Se verificó el correcto funcionamiento de las herramientas localmente, validando que evaden el filtrado de excepciones como requiere la tarea:

**Gitleaks (v8.28.0):**
- Ejecución con opción estándar detectó el secreto puro (`secreto.txt`) pero ignoró el archivo con el comentario de supresión (`secreto_allow.txt`).
- Ejecución con `--ignore-gitleaks-allow` detectó ambos archivos.

**Semgrep (1.178.0 con p/default):**
- Ejecución con opción estándar ignoró el hallazgo de `detect-child-process` en `sink.js` debido a `// nosemgrep`.
- Ejecución con `--disable-nosem` marcó explícitamente el archivo y mostró 3 Code Findings en el resumen (los dos de secretos más el de Semgrep).

### Objeciones a la spec
1. No se aclara en el criterio de aceptación 2 (`@[0-9a-f]{40} # v`) si las versiones deben llevar el prefijo literal `v` antes del número, lo cual puede ser confuso dependiendo de si la tag original en GitHub lo usa o no (ej. `@<sha> # v4` vs `@<sha> # 4`). Asumo que se debe escribir `# v<versión>`.
2. El criterio de las pruebas confía en la salida estándar de `npm test` para buscar `# tests N`. Esta salida es específica del test runner nativo de Node.js en su versión actual, pero el workflow no especifica ni fuerza una versión de Node (ej. usando `actions/setup-node`). Esto podría causar que el chequeo `# tests N` falle si el entorno por defecto de los runners de GitHub actualiza la salida de su runner de Node.js.

## Entrega 2: Verificación de la guardia en local

Se crearon y pushearon a `origin` las 8 ramas de abuso especificadas en la matriz desde el SHA base `1460273` de la tarea `T-006` (reportado en `T-006-r1.md`).

A continuación se muestran los resultados (exit codes) de la ejecución en local del script `.github/scripts/charter-guardia.sh` usando la rama respectiva en `HEAD_REF` y la base en `BASE_SHA`:

- `chr/T-006-abuso-kit`: `exit=1` (Detectado por `ABUSO.md`)
- `chr/T-006-abuso-raiz`: `exit=1` (Detectado por `TABLERO.md` en raíz)
- `chr/T-006-abuso-secreto`: `exit=0` (Permitido por la guardia, falla en CI)
- `chr/T-006-abuso-suprime`: `exit=0` (Permitido por la guardia, falla en CI)
- `chr/T-006-abuso-semgrep`: `exit=0` (Permitido por la guardia, falla en CI)
- `chr/T-006-abuso-rojo`: `exit=0` (Permitido por la guardia, falla en CI)
- `chr/T-006-abuso-vacio`: `exit=0` (Permitido por la guardia, falla en CI)
- `chr/T-006-abuso-ignora`: `exit=1` (Detectado por traer archivos de supresión de escáneres)
- `charter`: `exit=1` (Detectado como rama de coordinación no integrable)

Los resultados concuerdan estrictamente con el comportamiento definido en el contrato C-006. Las ramas que reportan `exit=0` en la guardia están diseñadas para ser bloqueadas por pasos posteriores del workflow (por ejemplo gitleaks, semgrep o pruebas).
