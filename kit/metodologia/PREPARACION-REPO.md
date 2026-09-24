# Preparación del repo (responsabilidad del PO)

Es la **Fase 0 obligatoria** de todo proyecto, nuevo o existente. El LIDER **no crea la rama de coordinación ni libera tareas** hasta que el PO confirme esta lista. La confirmación queda registrada en `PROYECTO.md` → *Preparación del repo*.

Las reglas del protocolo le dicen a los agentes qué no hacer; **esta configuración impide que puedan hacerlo**, aunque se equivoquen o alguien se lo pida.

## 1. Protección de la rama base (`main` y, si existe, `develop`)
En GitHub: *Settings → Rules → Rulesets* (o *Branches → Branch protection rules*).
- [ ] Integrar solo por Pull Request (sin push directo).
- [ ] Force push bloqueado.
- [ ] Borrado de la rama bloqueado.
- [ ] Solo el PO puede saltarse la regla (*bypass*), o nadie.
- [ ] Si hay CI: los checks deben pasar antes de integrar.

## 2. Protección de la rama de coordinación
- [ ] Regla para la rama de coordinación: force push y borrado bloqueados. El push normal queda permitido.

## 3. Acceso de cada instancia
- [ ] Cada instancia accede con permiso de **escritura** (write), nunca de administrador.
- [ ] Instancias web (ej. Claude Code en la web): la app de GitHub autorizada **solo para los repos del proyecto**, no para toda la cuenta.
- [ ] **Credencial del LIDER:** token *fine-grained* limitado a **este repo**, permiso *Contents: Read and write*, con fecha de vencimiento. Se entrega al LIDER por un canal seguro y **nunca** se guarda en CHARTER-DEV, en el repo ni en la rama de coordinación.

## 4. Seguridad de la plataforma
- [ ] *Secret scanning* y *push protection* activados (GitHub los bloquea antes de que un secreto llegue al remoto).
- [ ] *Dependabot alerts* activado.
- [ ] Repo privado, salvo decisión explícita del PO.

## 5. Prueba de humo (obligatoria)
Con la protección activa, el PO pide a cualquier instancia un push de prueba directo a la rama base. **Debe fallar** con un error de GitHub. Si no falla, la protección no está bien configurada y no se continúa.

## 6. Registro
El LIDER anota en `PROYECTO.md`:
```
## Preparación del repo
- Confirmada por el PO: AAAA-MM-DD
- Prueba de humo (push a la base rechazado): OK / FALLA
- Token del LIDER vence: AAAA-MM-DD
```

## Mantenimiento
- Token del LIDER: renovarlo antes de su vencimiento y revocarlo al cerrar el proyecto.
- Al retirar una instancia, se le quita el acceso al repo.
