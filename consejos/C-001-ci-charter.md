---
id: C-001
tema: Instalar el CI de CHARTER en api-lab con versiones fijas y verificar sus 4 casos de abuso (T-006)
epica: E3
disparador: sensible
estado: cerrado
ronda: sintesis
lentes: [COMPLETITUD, CONTRATOS, SIMPLICIDAD, AMENAZAS]
asiento_externo: ninguno
consenso: si
decision: D-8
fecha: 2026-09-25
inicio: 2026-09-25 02:03 -0500
fin: 2026-09-25 02:09 -0500
sesiones: 1
---

# C-001 — CI de CHARTER en api-lab (T-006)

## 0. Planteamiento (LIDER)
- **Problema:** api-lab (Node 22+/Express 5, repo público, `main` protegida con ruleset `proteger-main`) no tiene CI [HECHO: `ls .github/workflows` no existe en `origin/main` @ `b291042`]. Se instala `kit/configs/ci/charter-ci.yml` como `.github/workflows/charter-ci.yml`, y el PO marca como obligatorios 4 checks: `Guardia de ramas`, `Secretos (gitleaks)`, `Análisis estático (Semgrep)` y `Pruebas`. El job `Dependencias vulnerables` queda informativo (D-3: 22 vulnerabilidades preexistentes). Es la primera tarea de la prueba 3 del flujo CHARTER.
- **Qué pidió el PO (fijo, no se discute):**
  1. Imágenes con versión exacta: gitleaks `v8.28.0` y Semgrep con la versión vigente. Acciones fijadas por SHA, con la etiqueta en un comentario. Se registra como propuesta al kit.
  2. El autor es SENIOR-3 (un subagente Claude del LIDER). El probador es SENIOR-2 (Gemini) y escribe primero. El probador no abre PR: prepara las ramas de abuso `chr/T-006-abuso-kit`, `-secreto` y `-rojo` "desde `chr/T-006-ci`". El PO las abre como PR en borrador, verifica que fallen y las cierra. El caso "PR desde `charter`" lo abre el PO directamente.
  3. Objetivo (e) de la prueba 3: cada caso de abuso falla en el check correcto y el PR limpio pasa.
- **Material:** `kit/configs/ci/charter-ci.yml` (en esta rama `charter`), `kit/metodologia/GUARDAS.md` (capa 0), `package.json` en `main` (`"test": "node --test"`, hay `package-lock.json` y `tests/*.test.js`), DECISIONES D-1 (repo público), D-3 y D-5.
- **Hechos verificados por el LIDER el 2026-09-25:**
  - [HECHO: `git ls-remote --tags`] `actions/checkout`: `v4.4.0` = `11d5960a326750d5838078e36cf38b85af677262` (`runs.using: node20` según su action.yml). La última es `v7.0.1` = `3d3c42e5aac5ba805825da76410c181273ba90b1`.
  - [HECHO: `git ls-remote --tags`] `actions/setup-node`: `v4.4.0` = `49933ea5288caeca8642d1e84afbd3f7d6820020` (`node20`). `v6.5.0` = `249970729cb0ef3589644e2896645e5dc5ba9c38`. `v7.0.0` = `820762786026740c76f36085b0efc47a31fe5020`.
  - [HECHO: registros] `ghcr.io/gitleaks/gitleaks:v8.28.0` existe (HTTP 200). La última es `v8.30.1`. `semgrep/semgrep:1.178.0` existe en Docker Hub y es la última release de `semgrep/semgrep`.
  - [INFERENCIA] GitHub no permite abrir un PR entre ramas sin historia común. `charter` es huérfana, así que el caso "PR desde charter" probablemente lo rechaza GitHub antes de que corra el CI.
  - [INFERENCIA] En un PR con `pull_request` desde una rama del mismo repo, el workflow que corre es el del commit del PR. Una rama de abuso sin el archivo del workflow no dispara nada. Las ramas de abuso tienen que contener el commit del autor.
  - [INFERENCIA] Aunque el PR se cierre y la rama se borre, el contenido de un PR en un repo público queda accesible en `refs/pull/N/head`. Un "secreto" de prueba queda publicado para siempre.
- **Opciones abiertas:**
  - **O1, alcance del archivo:** (a) copia íntegra del kit, con los bloques de Python y Java que aquí nunca corren, o (b) solo los bloques de Node, porque GUARDAS §1 permite "ajustar lo que el stack exija".
  - **O2, versión mayor de las acciones:** (a) la última de la misma mayor que usa el kit (`v4.4.0`, node20) o (b) la última mayor (`checkout v7.0.1`, `setup-node v7.0.0` o `v6.5.0`).
  - **O3, orden probador → autor**, cuando las ramas de abuso necesitan el commit del autor: ¿cómo se cumple "el autor no empieza hasta que exista `reportes/T-006-pruebas.md`"?
  - **O4, caso charter:** ¿cómo se prueba el check de rama `charter` si GitHub no deja abrir ese PR?
  - **O5:** cualquier caso de abuso o criterio que falte. Por ejemplo, un PR que modifica el propio workflow para que pase.
- **Supuestos conocidos:** ninguno en ARQUITECTURA. Los de arriba marcados `[INFERENCIA]` pasan a S-00N si el consejo los necesita para el contrato.

## Reformulaciones
| Lente | Reformulación 1 | Reformulación 2 | ¿Mismo problema? |
|---|---|---|---|
| COMPLETITUD | Que ningún PR a `main` lleve secretos, hallazgos de SAST, pruebas en rojo ni archivos de coordinación, y demostrar que cada guarda falla cuando debe | 4 checks con nombre estable, cada uno en rojo solo ante su caso de abuso, exigidos por el ruleset | sí (el CI se prueba con el propio CI) |
| CONTRATOS | GitHub impide integrar 4 tipos de PR indebidos, con evidencia; el probador define los casos antes que el autor | Contrato de 3 partes: workflow fijado, nombres de check (clave del ruleset) y una secuencia de ramas en la que las de abuso contienen el commit del autor | **no**: hay una dependencia circular entre probador y autor |
| SIMPLICIDAD | Nada entra a `main` con secretos, Semgrep, pruebas en rojo o coordinación, y queda demostrado | Workflow fijado con 4 jobs que fallan en su caso y pasan en limpio, con evidencia aunque GitHub no deje abrir un caso | sí |
| AMENAZAS | Ningún PR llega a `main` con esos 4 tipos de problema sin que lo frene un check | El workflow de `pull_request` lo controla el mismo PR que evalúa: hay que delimitar qué garantiza el CI y qué la revisión humana | **no**: la auto‑modificación queda fuera del CI |

Ninguna reformulación cambia el problema. Dos lo amplían, con la secuencia probador→autor y los límites del CI, y eso se incorpora al planteamiento: se sigue.

## 1. Análisis a ciegas (resumen fiel; texto completo en la sesión del LIDER)
### COMPLETITUD
- **O5, workflow auto‑modificable:** con `pull_request` corre el YAML del PR [INFERENCIA]; un `exit 0` deja verdes los 4 checks y la guardia no revisa `.github/` [HECHO: charter-ci.yml:35].
- **Checks suplantables:** un status "Pruebas" publicado por la API [SUPUESTO]. El ruleset debe fijar GitHub Actions como origen.
- **Archivos de raíz de `charter`:** la regex no cubre ARQUITECTURA, TABLERO, DECISIONES… [HECHO: git ls-tree charter].
- **Semgrep sin caso de abuso;** `p/default` sin fijar [INFERENCIA].
- **Secreto:** debe coincidir con una regla de gitleaks v8.28.0, verificarse en local y ser sintético. El job de gitleaks no configura `safe.directory` y el de Semgrep sí [HECHO: :59 frente a :76].
- **O4:** script local con `HEAD_REF=charter`. **O3:** recetas primero y ramas después, sobre el commit del autor. **O2:** node20, retiro [DESCONOCIDO]. **O1:** indiferente; ningún `uses:` sin SHA de 40 caracteres.
- Borrar las pruebas deja "Pruebas" en verde [SUPUESTO].
- POSTURA: casos de abuso ampliados (workflow, raíz, Semgrep) y ruleset fijado a Actions | media | **BLOQUEANTE sí**
### CONTRATOS
- **Nombres congelados:** `Guardia de ramas`, `Secretos (gitleaks)`, `Análisis estático (Semgrep)` y `Pruebas` [HECHO: :20,46,63,79]. El informativo se llama `Dependencias vulnerables (informativo)` [HECHO: :122]. El ruleset se ata a la fuente GitHub Actions.
- **O1 (b):** el paso de Node es condicional (`if: hashFiles('package.json')`), así que un PR que borre `package.json` deja Pruebas en verde [HECHO: :84-93]. Debe ser incondicional.
- **O3:** secuencia de 4 pasos:
  1. El probador entrega `reportes/T-006-pruebas.md` con la matriz caso × 4 checks (falla, pasa, indiferente) y el contenido de cada rama.
  2. El autor hace push y reporta el SHA.
  3. El probador crea las ramas desde ese SHA.
  4. El PO abre los PR.
- **O4:** el rechazo de GitHub más la prueba local. **O5:** caso del workflow y CODEOWNERS; `p/default` no es reproducible [HECHO: :76]; "check correcto" no dice qué pasa con los demás [SUPUESTO].
- POSTURA: O1b con nombres congelados y Pruebas incondicional; O2 con SHA; O3 con 2 entregas del probador; O4 con rechazo + local; O5 con matriz y caso del workflow | media | **BLOQUEANTE sí**
### SIMPLICIDAD
- **O1 (b):** Python y Java nunca corren [HECHO: git ls-tree main] y fijarlos es superficie sin función.
- **O2 (b):** con node20 existe el riesgo de que los 4 checks obligatorios se pongan en rojo a la vez [DESCONOCIDO: fecha]; el workflow solo usa `fetch-depth` y `node-version` [HECHO: :23-88].
- **O3:** el probador escribe primero el plan y crea las ramas después del commit del autor.
- **O4:** el rechazo de GitHub; `-abuso-kit` ya cubre el riesgo real.
- **O5:** falta el caso Semgrep; revisión del PO en `.github/` sin más CI.
- POSTURA: O1b, O2b, O3 con plan primero, O4 con rechazo, más Semgrep y revisión de `.github/` | media | BLOQUEANTE no
### AMENAZAS
- **Archivos de raíz:** `-abuso-kit` sale verde y oculta el hueco de los `.md` de raíz [HECHO: :35, ls charter].
- **Workflow editado:** `exit 0`, sin control en GitHub con la cuenta admin (D-5); queda en la revisión humana.
- **Supresión:** `gitleaks:allow`, `nosemgrep`, `.gitleaksignore`/`.semgrepignore` [SUPUESTO].
- **`workflow_dispatch`:** sin `BASE_SHA` la guardia no revisa rutas; ¿satisface el check obligatorio? [DESCONOCIDO].
- **Token:** `checkout` lo deja en `.git/config`, montado en los contenedores [INFERENCIA]; se corrige con `persist-credentials: false`.
- **Cadena de suministro:** etiquetas movibles; lo inmutable es `@sha256`. `p/default` cambia en cada corrida.
- **O1 (b).** **O2:** el SHA importa más que la mayor.
- **Secreto:** ficticio y generado, probado en local, nunca escrito en `charter`; la clave de ejemplo de AWS está en la lista de permitidos [SUPUESTO].
- **Casos propuestos:** A5 `-raiz` (falla la Guardia), A6 `-workflow` (verde, límite conocido que se documenta), A7 `-suprime` (verde con el kit) y A8 `workflow_dispatch`.
- POSTURA: O1b, SHA + digest, `persist-credentials: false`, la guardia cubre la raíz, A5–A8 | media | **BLOQUEANTE sí** (hueco de los archivos de raíz)

## 2. Contrapunto (anónimo: Lente A = COMPLETITUD, B = CONTRATOS, C = SIMPLICIDAD, D = AMENAZAS)
### COMPLETITUD
- Objeción a B: con el paso de Node incondicional, un PR que borre los tests sigue en verde. En Node 22, `node --test` sin tests termina con `# tests 0` y exit 0 [HECHO: verificado por el LIDER en `node:22-alpine`, v22.23.3]. Hay que fallar si el total es 0.
- Objeción a C: `-abuso-kit` no cubre los `.md` de raíz, y que GitHub rechace el PR desde `charter` no prueba el script de la guardia.
- Refuerzo a D: `workflow_dispatch` sin `BASE_SHA` se salta la revisión de rutas [HECHO: :34].
- Cambio de postura: parcial. Con D-5, CODEOWNERS no es un control; el workflow editado queda como límite documentado.
### CONTRATOS
- Objeción a A: el job de gitleaks no necesita `safe.directory`, porque la imagen ya lo trae [HECHO: Dockerfile de gitleaks v8.28.0, `git config --global --add safe.directory '*'`; lo confirmó también el LIDER].
- A D, que se refuerza: una corrida de `workflow_dispatch` sobre el SHA del PR podría tapar un rojo de la guardia con un verde del mismo nombre [INFERENCIA]. Hay que quitar el disparador o fallar sin `BASE_SHA`.
- Objeción a C: que node20 deje los 4 checks en rojo a la vez no está verificado [DESCONOCIDO]. Igual acepta O2b.
- Confirma lo de D sobre AWS: la lista de permitidos incluye `.+EXAMPLE$` [HECHO: config/gitleaks.toml v8.28.0:206-208].
- Cambio de postura: suma O2b y la guardia de raíz.
### SIMPLICIDAD (con el contrafactual pedido por el LIDER)
- Contrafactual: copiar el kit tal cual con solo los pins y llevar los huecos al kit. Si se endurece solo aquí, se prueba otra cosa y api-lab se desincroniza del kit.
- Objeción a B: incondicional rompe el multi‑stack del kit; en el kit se resuelve fallando si no se detecta ningún stack.
- Objeción a A: `README.md` está en la raíz de `main`, así que se necesita una lista explícita, no un patrón.
- Objeción a D: A7/A8 y el digest amplían el alcance.
- Concede: `-abuso-kit` no cubre la raíz.
### AMENAZAS
- Objeción a C: el PR puede apagar gitleaks sin tocar `.github/` [HECHO: gitleaks v8.28.0 `cmd/root.go:36-38` (`.gitleaks.toml`), `:303` (`.gitleaksignore`), `detect/detect.go:28,490` (`gitleaks:allow`)].
- Objeción a B: CODEOWNERS no sirve con una sola cuenta admin (D-5).
- Objeción a A: fijar el origen en Actions no frena un workflow editado.
- Verificó el supuesto de AWS `EXAMPLE`. Sin cambio de postura.

## 3. Posturas finales
| Lente | Postura | Confianza | Bloqueante |
|---|---|---|---|
| COMPLETITUD | Guardia de raíz, caso Semgrep, mínimo 1 test, sin dispatch sin `BASE_SHA` | media | sí, se levanta si el contrato incluye esas 4 cosas con su caso |
| CONTRATOS | O1b con nombres congelados y Pruebas incondicional; SHA + digest; 2 entregas del probador con el SHA del autor como interfaz; matriz caso × check; sin dispatch | media | sí, se levanta si la tarjeta fija la matriz, la secuencia y el dispatch |
| SIMPLICIDAD | O1b y SHAs; raíz y Pruebas incondicional también como propuesta al kit con el mismo texto; límite de `.github/` documentado | media | no |
| AMENAZAS | O1b, SHA + digest, `persist-credentials: false`, Pruebas incondicional, A5–A8 | alta | sí, se levanta con la guardia para raíz y archivos de supresión y `--ignore-gitleaks-allow` |

## 4. Síntesis (LIDER)
- **Decisión:** se instala el CI adaptado a Node con **todas** las condiciones que levantan los 3 bloqueantes (contrato C-006 en `ARQUITECTURA.md`) → `DECISIONES.md` D-8. Las mejoras se proponen al kit con el mismo texto (postura de SIMPLICIDAD), y el PO decide en el kit.
  - O1: (b), solo Node.
  - O2: (b), `checkout v7.0.1` y `setup-node v7.0.0`, las dos `node24` [HECHO: action.yml en su SHA].
  - O3: el probador entrega en 2 pasos, con el SHA del autor como interfaz.
  - O4: el PO intenta abrir el PR y guarda el rechazo de GitHub; además, el probador corre en local el script de la guardia con `HEAD_REF=charter`.
  - O5: los casos A1–A9 de la tarjeta; el workflow editado queda como **límite documentado**.
- **Compromisos aceptados:**
  - El workflow de api-lab difiere de la plantilla del kit hasta que el PO decida la propuesta.
  - `p/default` baja reglas del registro en cada corrida, así que el resultado de Semgrep no es 100 % reproducible [INFERENCIA]. Lo mitiga `--baseline-commit`.
  - Un PR que edita el workflow puede ponerlo en verde, y solo lo frena la revisión del diff de `.github/` (D-5: una sola cuenta admin).
  - Son 8 PR de abuso en borrador, no 3: más trabajo del PO en esta tarea.
- **Revertir si:** en 30 días algún check obligatorio da un falso positivo en un PR legítimo sin que la causa se pueda corregir en el PR; o si `v7` de las acciones falla en el runner (en ese caso se baja a la última `v6` por SHA).
- **Preguntas abiertas:** ninguna que bloquee.
- **Disenso:** SIMPLICIDAD, en el contrafactual: "si se endurece solo aquí, se prueba otra cosa que el CI del kit y el próximo proyecto hereda los huecos". Se atiende proponiendo el mismo texto al kit, sin esperar a que se apruebe.
- **Supuestos nuevos:**
  - S-001 (GitHub rechaza el PR desde `charter`): no afecta al contrato; se registra la evidencia.
  - Dos quedaron verificados por el LIDER: `node --test` con 0 tests sale con exit 0 en Node 22, y existe `--disable-nosem` en Semgrep 1.178.0 [HECHO: `cli/src/semgrep/commands/scan.py:243` en v1.178.0].

## Controles aplicados
- Acuerdo >70 % en la ronda 1 → contrafactual pedido a SIMPLICIDAD (ver ronda 2).
- Ninguna lente repitió su ronda 1.
