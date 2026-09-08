# 11 · Migración JS/JSX → TypeScript — Tareas

_Checklist accionable derivada del `plan.md`. Marca `[x]` al completarlas._

## Configuración

- [x] Revisar/ajustar `tsconfig.json` (strict, `paths` alias `@/`).
- [x] Revisar/ajustar `vite.config.js` para el alias `@/`.

## Tipado de modelos y API

- [x] Definir tipos de modelo en `src/types/` a partir de `src/entities/Appointment.jsonc` y la forma de los servicios.
- [x] Tipar `src/services/api.ts` (payloads de reserva/cancelación/consulta, respuestas, errores 401/400/409 y `SlotUnavailable`).

## Migración de archivos

- [x] Renombrar `.js` → `.ts` y `.jsx` → `.tsx` en `src/` (progresivo, compilando de a uno).
- [x] Ajustar imports y alias en todos los archivos (alias `@/`).
- [x] Verificar que no queden archivos `.jsx`/`.js` en `src/` (excepto configs).

## Validación

- [x] `pnpm typecheck` sin errores (`tsc6 --noEmit`).
- [x] `pnpm lint` sin errores (typescript-eslint configurado para `*.ts/tsx`).
- [x] `pnpm build` compila.
- [x] Funcionalidad (reserva, catálogo, mis turnos) intacta (dev server levanta, build OK).
- [x] Mover la feature a "Hecho" en `spec/constitution/roadmap.md` y actualizar `docs/CAMBIOS.md`.