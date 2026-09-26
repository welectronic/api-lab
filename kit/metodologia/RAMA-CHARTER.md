# Rama `charter` — la coordinación de cada proyecto vive en Git

## Qué es

Cada repo de proyecto tiene una **rama huérfana** llamada `charter`: no comparte historia con el código y **nunca se hace merge** con la rama base. Contiene toda la coordinación del proyecto (spec, plan, tareas, reportes y revisiones) y una copia del kit que el proyecto usa.

```
rama charter
├── LEEME.md                  ← qué es esta rama y cómo se usa
├── PROYECTO.md  PRINCIPIOS.md  SPEC.md  PLAN.md  ARQUITECTURA.md
├── CONVENCIONES.md  DECISIONES.md  TABLERO.md  BITACORA.md  TROPIEZOS.md  DIAGNOSTICO.md
├── tareas/  reportes/  revisiones/  consejos/
└── kit/                      ← copia del kit (solo lo que el proyecto usa)
    ├── VERSION               ← fecha de la copia
    ├── ROSTER.md
    ├── metodologia/  plantillas/  roles/
    └── estandares/           ← seguridad.md + los del stack del proyecto + configs
```

**Por qué:**
- Todas las instancias (IDE local, Claude Code en la web o cualquier otra) coordinan por Git. Nadie depende de una carpeta sincronizada.
- La rama base y los PR quedan limpios: solo código.
- El LIDER puede hacer push a `charter` sin tocar nunca la rama base.

**Los datos comerciales (`CHARTER-DEV/comercial/`) nunca se copian a la rama ni a `kit/`.** Precios, presupuestos, tarifas y márgenes no se escriben en ningún archivo de `charter`. **Tampoco `CHARTER-DEV/cotizaciones/`**: al aprobarse una cotización solo se siembran épicas, arquitectura y decisiones.

**CHARTER-DEV (OneDrive) sigue siendo la fuente maestra** del kit y de `soluciones/`. La rama lleva una copia que el LIDER actualiza cuando el kit cambia.

## Carpeta de trabajo: un worktree al lado del clon

Cada instancia abre la rama `charter` en una **segunda carpeta** junto a su clon del código (worktree de Git). Así tiene el código y la coordinación a la vez, sin cambiar de rama.

```
C:\dev\mi-repo\            ← código (rama de la tarea)
C:\dev\mi-repo.charter\   ← coordinación (rama charter)
```

**Primera vez en cada instancia** (lo ejecuta el propio agente con `CHARTER: verificar <ID>`):
```
git fetch origin charter
git worktree add ../<repo>.charter charter
```
En un entorno web sin carpetas persistentes, el agente hace lo mismo dentro de su sesión.

## Reglas de escritura

1. **Antes de leer:** `git -C ../<repo>.charter pull --rebase`.
2. **Un archivo, un escritor** (tabla de `PROTOCOLO.md`). Cada instancia commitea solo sus propios archivos.
3. **Commits:** `CHR: <ID> <acción> T-XXX` (ej. `CHR: SENIOR-1 reporte T-004 r1`).
4. **Push:** `git pull --rebase` y luego `git push origin charter`. Si falla por concurrencia, se repite `pull --rebase` y push. **Nunca `--force`.**
5. **Nunca** se hace merge de `charter` a otra rama ni al revés.
6. **Nunca** se escriben secretos: la rama viaja con el repo.

## Creación (LIDER, en el arranque del proyecto)

```
git -C <clon> fetch origin
git -C <clon> worktree add --detach ../<repo>.charter
cd ../<repo>.charter
git checkout --orphan charter
git rm -rf --quiet .            # la rama nace vacía
# copiar proyectos/_PLANTILLA/* y el kit/ correspondiente
git add . && git commit -m "CHR: LIDER inicializa coordinación"
git push -u origin charter
```

## Protecciones y accesos

Los configura el PO en la Fase 0, según [PREPARACION-REPO.md](PREPARACION-REPO.md): rama base protegida, rama de coordinación sin force push ni borrado, acceso de escritura por instancia y token del LIDER limitado al repo. La rama se crea **desde el clon local del PO** y se sube; las demás instancias solo la traen.

## Actualizar el kit copiado

Cuando el PO cambie el kit maestro y lo indique, el LIDER copia los archivos afectados a `kit/`, actualiza `kit/VERSION` y lo anota en `BITACORA.md`. Nunca modifica `kit/` por iniciativa propia.

## Si el repo se comparte

Antes de dar acceso al repo a un tercero (cliente, público), decidir con el PO si la rama `charter` se borra del remoto o se conserva. Contiene especificaciones, revisiones y decisiones internas.
