#!/usr/bin/env bash
# CHARTER — Guardia de ramas (contrato C-006, T-006).
# Uso (desde la raíz del repo, también en local):
#   HEAD_REF=<rama> BASE_SHA=<sha> bash .github/scripts/charter-guardia.sh
# Sale con 1 y ::error:: si:
#   1. HEAD_REF es 'charter';
#   2. BASE_SHA está vacío;
#   3. el PR trae archivos de coordinación de CHARTER o archivos que suprimen escáneres.
# En los demás casos sale con 0; avisa con ::warning:: si el PR toca .github/
# o si la rama no sigue chr/T-XXX-<slug>.
# Solo usa bash, git y grep.
set -u

HEAD_REF="${HEAD_REF:-}"
BASE_SHA="${BASE_SHA:-}"

# Une las líneas de una lista en una sola, separadas por ", " (para el ::error::).
unir() {
  local out="" linea
  while IFS= read -r linea; do
    [ -z "$linea" ] && continue
    if [ -z "$out" ]; then out="$linea"; else out="$out, $linea"; fi
  done <<< "$1"
  printf '%s' "$out"
}

# 1. La rama de coordinación nunca se integra al código.
if [ "$HEAD_REF" = "charter" ]; then
  echo "::error::La rama 'charter' es de coordinación y nunca se integra al código."
  exit 1
fi

# 2. Sin la base del PR no hay nada que comparar.
if [ -z "$BASE_SHA" ]; then
  echo "::error::BASE_SHA vacío: no se puede verificar sin la base del PR."
  exit 1
fi

# Si git no puede calcular el diff (base inexistente o historia incompleta), se falla cerrado.
if ! cambios=$(git diff --name-only "$BASE_SHA"...HEAD); then
  echo "::error::No se pudo calcular 'git diff $BASE_SHA...HEAD': no se puede verificar el PR."
  exit 1
fi

fallo=0

# 3a. Carpetas de coordinación de CHARTER.
coord=$(printf '%s\n' "$cambios" | grep -E '^(tareas|reportes|revisiones|consejos|kit)/' || true)
if [ -n "$coord" ]; then
  echo "::error::El PR trae archivos de coordinación de CHARTER: $(unir "$coord")"
  printf '%s\n' "$coord"
  fallo=1
fi

# 3b. Archivos de la raíz de 'charter' (exactos y en la raíz; README.md no).
raiz=$(printf '%s\n' "$cambios" | grep -E '^(ARQUITECTURA|BITACORA|CONVENCIONES|DECISIONES|DIAGNOSTICO|LEEME|PLAN|PRINCIPIOS|PROYECTO|SPEC|TABLERO|TROPIEZOS)\.md$' || true)
if [ -n "$raiz" ]; then
  echo "::error::El PR trae archivos de la raíz de la rama 'charter': $(unir "$raiz")"
  printf '%s\n' "$raiz"
  fallo=1
fi

# 3c. Archivos que suprimen escáneres, en cualquier ruta.
supresion=$(printf '%s\n' "$cambios" | grep -E '(^|/)(\.gitleaks\.toml|\.gitleaksignore|\.semgrepignore)$' || true)
if [ -n "$supresion" ]; then
  echo "::error::El PR trae archivos que suprimen escáneres: $(unir "$supresion")"
  printf '%s\n' "$supresion"
  fallo=1
fi

if [ "$fallo" -ne 0 ]; then
  exit 1
fi

# Avisos (no bloquean).
github=$(printf '%s\n' "$cambios" | grep -E '^\.github/' || true)
if [ -n "$github" ]; then
  echo "::warning::El PR modifica .github/ (revisar el diff completo, L-1): $(unir "$github")"
fi

case "$HEAD_REF" in
  chr/T-*) echo "Rama de tarea: $HEAD_REF" ;;
  *) echo "::warning::La rama '$HEAD_REF' no sigue chr/T-XXX-<slug>." ;;
esac

exit 0
