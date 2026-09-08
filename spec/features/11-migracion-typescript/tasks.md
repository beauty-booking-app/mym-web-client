# 11 · Migración JS/JSX → TypeScript — Tareas

_Checklist accionable derivada del `plan.md`. Marca `[x]` al completarlas._

## Configuración

- [ ] Revisar/ajustar `tsconfig.json` (strict, `paths` alias `@/`).
- [ ] Revisar/ajustar `vite.config.ts` para el alias `@/`.

## Tipado de modelos y API

- [ ] Definir tipos de modelo en `src/types/` a partir de `src/entities/Appointment.jsonc` y la forma de los servicios.
- [ ] Tipar `src/services/api.ts` (payloads de reserva/cancelación/consulta, respuestas, errores 401/400/409 y `SlotUnavailable`).

## Migración de archivos

- [ ] Renombrar `.js` → `.ts` y `.jsx` → `.tsx` en `src/` (progresivo, compilando de a uno).
- [ ] Ajustar imports y alias en todos los archivos.
- [ ] Verificar que no queden archivos `.jsx`/`.js` en `src/` (excepto configs).

## Validación

- [ ] `pnpm typecheck` sin errores.
- [ ] `pnpm lint` sin errores.
- [ ] `pnpm build` compila.
- [ ] Funcionalidad (reserva, catálogo, mis turnos) intacta.
- [ ] Mover la feature a "Hecho" en `spec/constitution/roadmap.md` y actualizar `docs/CAMBIOS.md`.