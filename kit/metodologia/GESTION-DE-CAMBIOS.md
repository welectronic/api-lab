# Gestión de cambios

## A. Cambio de rumbo

Aplica cuando, a mitad de una oleada, aparece un requisito nuevo, se descubre un límite técnico, se malinterpretó un requisito o un enfoque fracasa.

Disparador: `CHARTER: <proyecto> cambio: <qué pasó>`.

1. **Entender el disparador.** Qué tarea lo reveló y qué tipo de cambio es: límite técnico, requisito nuevo, malentendido, cambio estratégico o enfoque fallido. Sin evidencia concreta (error, mensaje del cliente, restricción) no se avanza.
2. **Evaluar el impacto** en `SPEC.md`, `ARQUITECTURA.md` (contratos), las tareas en curso, las ya integradas y las futuras.
3. **Elegir el camino:**
   - **Ajuste directo**: cambiar o agregar tareas sin tocar el alcance.
   - **Revertir**: descartar ramas o tareas que ya no sirven.
   - **Replantear alcance**: el MVP cambia, y requiere aprobación del PO.
4. **Proponer al PO** el cambio: qué cambia en la spec o arquitectura, qué tareas se afectan, el costo aproximado y la recomendación.
5. **Aplicar** tras la aprobación: registrar en `DECISIONES.md`, actualizar documentos, pausar (`bloqueada`) las tareas afectadas y crear las nuevas.

## B. Recorte de alcance

Aplica cuando una oleada tiene más de 15 tareas, una tarea llega a la ronda 3, se agota la cuota de alguna instancia o el PO pide entregar antes.

1. Revisa el **tipo de valor** de cada tarea (ver `ROLES.md`).
2. Recorta en este orden:
   - Primero lo `especulativo`.
   - Después el `pulido`.
   - Si hace falta, la `robustez`.
   - El `nucleo` solo con aprobación del PO.
   - Lo `desbloqueante` **nunca**.
3. Las tareas recortadas no se borran: pasan a la sección *Backlog* de `PLAN.md` con el motivo.
4. Verifica que el plan reducido siga entregando las historias P1 y que no queden dependencias rotas.
