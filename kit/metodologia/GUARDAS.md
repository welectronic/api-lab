# Guardas: reglas que se aplican, no solo se piden

Las reglas críticas de CHARTER (ninguna IA hace merge, PR ni push a la rama base; nadie modifica skills ni el kit sin el PO) están escritas en las skills, pero una IA puede equivocarse. Las guardas hacen que el comando **falle** aunque la IA lo intente. Son tres capas; ninguna es perfecta sola.

| Capa | Qué bloquea | Dónde aplica | Límite |
|---|---|---|---|
| 0. CI en GitHub (`configs/ci/charter-ci.yml`) | Integrar un PR con secretos, hallazgos de Semgrep, pruebas en rojo o archivos de coordinación | **Todas** las instancias, también Claude Code web, porque corre en GitHub | Solo actúa sobre PR; el push directo lo frenan la regla de la rama y la capa 1. En repos privados consume minutos de GitHub Actions |
| 1. Hook `pre-push` (`configs/guardas/pre-push`) | Push a la rama base, borrar la base o `charter`, push forzado a `charter` | Cualquier herramienta que empuje desde tu clon local (Claude Code local, Antigravity y tú) | No aplica a Claude Code web (usa su propio clon en la nube); se salta con `--no-verify` (por eso la capa 2 lo niega) |
| 2. Permisos de Claude Code (`configs/guardas/claude-settings.json`) | `git merge`, `gh pr create/merge`, push forzado, push directo a la base, `--no-verify`, cambiar `core.hooksPath`, editar skills; pide confirmación para editar `kit/` y los hooks | Claude Code local (LIDER, SENIOR-3 y sus subagentes) | Coincide por prefijo: una variante rara del comando podría pasar, pero la capa 1 la detiene al empujar |
| 3. Lista de comandos de Antigravity | Los mismos comandos de la capa 2 | Antigravity (SENIOR-2, RAPIDO) | Se configura a mano en sus ajustes de terminal (`[INFERENCIA]`: revisa el nombre exacto del ajuste en tu versión) |

La protección de GitHub (Fase 0) sigue siendo la capa de fondo: con la cuenta del PO y el bypass *For pull requests only*, un push directo a la base igual queda registrado.

## Instalación (una vez por clon, en la Fase 0)

El PO se lo pide al LIDER en Claude Code local:

```
CHARTER: <proyecto> instala las guardas en mi clon <ruta>
```

El LIDER:
1. Copia `configs/guardas/pre-push` a `<clon>/.git/hooks/pre-push`. Los worktrees (`../<repo>.charter`, `../<repo>.T-XXX`) usan los hooks del clon principal, así que basta una vez.
2. Si la rama base no es `main`: `git -C <clon> config charter.base <rama>`.
3. Agrega las reglas de `configs/guardas/claude-settings.json` a `%USERPROFILE%\.claude\settings.json` **sin borrar lo que ya tenga**, y le muestra al PO el resultado.
4. Prueba la guarda: `git -C <clon> push --dry-run origin HEAD:<base>` debe fallar con el mensaje `CHARTER: push a la rama base … bloqueado`.
5. Le dice al PO qué agregar en la lista de comandos denegados de Antigravity.

Quitar o cambiar una guarda es decisión del PO, como cualquier cambio al kit.

## CI (capa 0): instalación
1. En T-000 (o en una tarea de E3 en un repo existente), el desarrollador copia `configs/ci/charter-ci.yml` a `.github/workflows/charter-ci.yml` del repo, en su rama de tarea. Ajusta solo lo que el stack exija (por ejemplo, el comando de pruebas).
2. El PO integra ese PR como cualquier otro.
3. El PO abre la regla de la rama base en GitHub (*Rulesets*), activa *Require status checks to pass* y agrega `Guardia de ramas`, `Secretos (gitleaks)`, `Análisis estático (Semgrep)` y `Pruebas`. `Dependencias vulnerables` queda informativo hasta que se resuelva la línea base.
4. Si Semgrep marca algo en código viejo que el PR no tocó, no bloquea: el escaneo compara contra la base del PR.
