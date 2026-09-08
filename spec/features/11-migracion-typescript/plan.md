# 11 · Migración JS/JSX → TypeScript — Plan

**Estado:** propuesta (pendiente de aprobación)

## Objetivo técnico

Migrar el código fuente de `.jsx`/`.js` a `.tsx`/`.ts` respetando la constitución (`tech-stack.md`) y sin alterar el comportamiento. Es una migración **mecánica + tipado**, no un rediseño.

## Decisiones de diseño

1. **Renombrar de forma incremental:** convertir archivos de a uno para no romper el build; primero los que no tienen dependencias y luego el resto.
2. **Tipado por capas:**
   - Modelos de dominio primero (Appointment, Service, respuestas de la API).
   - Luego `src/services/api.ts` (payloads de reserva/cancelación/consulta, manejo de 401/400/409 y `SlotUnavailable`).
   - Por último los componentes/páginas.
3. **Config:**
   - Revisar `tsconfig.json` (strict, paths alias `@/`).
   - Revisar `vite.config.ts` para el alias `@/`.
4. **Sin `any` sin justificar:** si un tipo no se puede resolver con seguridad, documentar el motivo.

## Estructura propuesta de archivos tras la migración

```
src/
├── pages/                # .tsx
├── components/           # .tsx
├── context/              # .tsx
├── hooks/                # .ts
├── services/
│   └── api.ts            # cliente API con tipos
├── types/                # interfaces TS compartidas
├── utils/                # .ts
├── App.tsx
├── main.tsx
└── index.css
```

## Pasos de implementación (orden)

1. Revisar/ajustar `tsconfig.json` (strict, `paths` alias `@/`) y `vite.config.ts`.
2. Definir tipos de modelo en `src/types/` a partir de `src/entities/Appointment.jsonc` y la forma de los servicios.
3. Tipar `src/services/api.ts` (payloads y respuestas, errores 401/400/409).
4. Renombrar `.js`→`.ts` y `.jsx`→`.tsx` en `src/`, de a archivos, compilando progresivamente.
5. Ajustar imports y alias.
6. `pnpm typecheck` sin errores.
7. `pnpm lint`, `pnpm build`.
8. Verificar funcionalidad (reserva, catálogo, mis turnos).

## Riesgos

- **Rompimiento del build durante la migración:** mitigado migrando de a archivos y compilando progresivamente.
- **Tipos difíciles de resolver sin `any`:** se documentan y se resuelven con tipos explícitos cuando sea posible.
- **Funciona junto a features 09 y 10:** el orden de implementación puede variar; esta feature es lo más mecánica posible para no interferir.

## Criterios de "done"

- Código fuente 100% `.tsx`/`.ts` donde corresponde.
- `typecheck` / `lint` / `build` en verde.
- Funcionalidad intacta.
- Feature movida a "Hecho" en `spec/constitution/roadmap.md`.
- `docs/CAMBIOS.md` actualizada si existe.