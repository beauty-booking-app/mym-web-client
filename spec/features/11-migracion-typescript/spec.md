# 11 · Migración JS/JSX → TypeScript

**Estado:** propuesta (pendiente de aprobación)

## Contexto

El repositorio declara TypeScript en la constitución (`tech-stack.md`), pero parte del código fuente sigue en `.jsx`/`.js`. Esta feature alinea el código con la convención declarada migrando los archivos a `.tsx`/`.ts` y tipando los modelos y el cliente de API.

## Qué hace

1. **Renombrar archivos:** `.jsx` → `.tsx` y `.js` → `.ts` donde corresponda.
2. **Configurar tooling:** alias `@/` en `tsconfig.json`/`vite.config.ts` si hace falta.
3. **Tipar modelos:** modelos de datos (a partir de `src/entities/Appointment.jsonc`, servicios) como interfaces TS.
4. **Tipar `src/services/api.js`** (payloads de reserva/cancelación/consulta, respuestas, manejo de errores 401/400/409).
5. **Asegurar `pnpm typecheck` sin errores.**

## Por qué

- Cumple la convención ya declarada del repositorio (`tech-stack.md`).
- Reduce bugs silenciosos con tipos estrictos.
- Facilita el mantenimiento futuro del flujo de reserva.

## Criterios de aceptación

- [ ] El código fuente pasa de `.jsx`/`.js` a `.tsx`/`.ts` donde corresponda.
- [ ] Modelos tipados (Appointment, servicios, respuestas de la API).
- [ ] `src/services/api.ts` tipado (payloads y respuestas).
- [ ] Alias `@/` configurado si aplica.
- [ ] `pnpm typecheck` no arroja errores.
- [ ] `pnpm lint` sin errores.
- [ ] `pnpm build` compila.
- [ ] La funcionalidad (reserva, catálogo, mis turnos) queda intacta tras la migración.

## Fuera de alcance

- Cambio de identidad (nombre, paleta, tipografías) → feature **09**.
- Landing scroll único, reserva integrada y catálogo en grid → feature **10**.
- Cambios funcionales en la lógica de reserva o en el contrato de datos con la API.
- Usar `any` sin justificarlo (regla del repo).

## Notas

- Los archivos de configuración (`.ts`, `.cjs`) no se renombran.
- Si algún archivo no se puede tipar sin peligro, se documenta explícitamente.