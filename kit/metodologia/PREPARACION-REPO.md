# Preparación del repo (responsabilidad del PO)

Es la **Fase 0 obligatoria** de todo proyecto, nuevo o existente. El LIDER **no crea la rama de coordinación ni libera tareas** hasta que el PO confirme esta lista. La confirmación queda registrada en `PROYECTO.md` → *Preparación del repo*.

Las reglas del protocolo le dicen a los agentes qué no hacer; **esta configuración impide que puedan hacerlo**, aunque se equivoquen o alguien se lo pida.

## 1. Protección de la rama base (`main` y, si existe, `develop`)
En GitHub: *Settings → Rules → Rulesets* (o *Branches → Branch protection rules*).
- [ ] Integrar solo por Pull Request (sin push directo).
- [ ] Force push bloqueado.
- [ ] Borrado de la rama bloqueado.
- [ ] Solo el PO puede saltarse la regla (*bypass*), o nadie. **Si las instancias de IA usan la misma cuenta del PO** (caso típico: Claude Code web o un IDE local con la sesión de GitHub del PO), el bypass debe ser **solo para pull requests** (*For pull requests only*), nunca *Always allow*: si no, los agentes también pueden empujar directo a la base.
- [ ] Si hay CI: los checks deben pasar antes de integrar.

## 2. Protección de la rama de coordinación
- [ ] Regla para la rama de coordinación: force push y borrado bloqueados. El push normal queda permitido.

## 3. Acceso de cada instancia

> **Causa raíz a tener presente:** GitHub no distingue a las instancias entre sí si todas usan la cuenta del PO (sesión de GitHub en Claude Code web, credencial de Git en un IDE local). Para GitHub, cada push de un agente es un push del PO. Por eso la protección de la base depende de que el bypass esté en modo *For pull requests only* (§1).
> **Mejor práctica, cuando el proyecto lo justifique:** dar a las instancias una identidad propia, sin permisos de bypass, por ejemplo una cuenta de GitHub separada para los agentes o un token *fine-grained* por instancia. Así las reglas aplican sin excepciones.

- [ ] Cada instancia accede con permiso de **escritura** (write), nunca de administrador.
- [ ] Instancias web (ej. Claude Code en la web): la app de GitHub autorizada **solo para los repos del proyecto**, no para toda la cuenta.
- [ ] **Credencial del LIDER:** token *fine-grained* limitado a **este repo**, permiso *Contents: Read and write*, con fecha de vencimiento. Se entrega al LIDER por un canal seguro y **nunca** se guarda en CHARTER-DEV, en el repo ni en la rama de coordinación.

## 4. Seguridad de la plataforma
- [ ] *Secret scanning* y *push protection* activados (GitHub los bloquea antes de que un secreto llegue al remoto).
- [ ] *Dependabot alerts* activado.
- [ ] Repo privado, salvo decisión explícita del PO.

## 4a. CI obligatorio
- [ ] `.github/workflows/charter-ci.yml` instalado (en T-000 o en la primera tarea) y sus checks marcados como obligatorios en la regla de la rama base (`GUARDAS.md`, capa 0).

## 4b. Guardas locales (`GUARDAS.md`)
- [ ] Hook `pre-push` de CHARTER instalado en el clon local del PO (lo instala el LIDER con `CHARTER: <proyecto> instala las guardas en mi clon <ruta>`), probado con un `--dry-run` a la base que debe fallar.
- [ ] Reglas de `configs/guardas/claude-settings.json` agregadas a la configuración de Claude Code.
- [ ] Comandos denegados configurados en Antigravity.

## 5. Registro
El LIDER anota en `PROYECTO.md`:
```
## Preparación del repo
- Confirmada por el PO: AAAA-MM-DD
- Token del LIDER vence: AAAA-MM-DD
```

## Mantenimiento
- Token del LIDER: renovarlo antes de su vencimiento y revocarlo al cerrar el proyecto.
- Al retirar una instancia, se le quita el acceso al repo.
