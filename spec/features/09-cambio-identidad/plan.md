# 09 · Cambio de identidad MyM — Plan

**Estado:** propuesta (pendiente de aprobación)

## Objetivo técnico

Aplicar la nueva identidad de marca (nombre, textos, paleta negro+dorado, tipografías premium) sobre el código existente **sin** reestructurar la landing ni migrar a TypeScript (esas son las features 10 y 11). Es un cambio de **presentación**, no de lógica.

## Decisiones de diseño

1. **Identidad:** "Tammi" → **MyM**. Tono del texto elegante y sobrio, sin tópicos de barrio.
2. **Paleta negro + dorado** (definida en el `spec.md`): fondo negro, cards oscuras, acento dorado miel. Se actualiza en los tokens de `src/index.css` para que toda la app la herede.
3. **Tipografía:** Playfair Display (títulos) + Plus Jakarta Sans (cuerpo), desde Google Fonts en `index.html`.

## Pasos de implementación (orden)

1. Actualizar `index.html`: título "MyM", favicon, Google Fonts (Playfair Display + Plus Jakarta Sans).
2. Actualizar tokens de color y tipografía en `src/index.css` a la paleta negro + dorado y a Playfair/Plus Jakarta.
3. Actualizar nombre de marca y textos a tono premium/sobrio en navbar, hero, footer y resto del contenido.
4. Verificar visual en desktop y mobile; corroborar que no se rompió la funcionalidad.
5. `pnpm lint`, `pnpm build`.

> Esta feature se ejecuta sobre el código actual (JS/JSX). Si la migración TS (feature 11) ya se hizo, los archivos serán `.tsx`; el alcance visual es el mismo.

## Riesgos

- **Rompimiento visual parcial:** mitigado actualizando tokens centrales para que el cambio sea global y coherente.
- **Dependencia con features 10 y 11:** el rediseño de secciones y la migración TS se tratan en features separadas; esta feature solo asegura la identidad visual.

## Criterios de "done"

- Feature verificada contra `spec.md` (criterios de aceptación todos marcados).
- `lint` / `build` en verde.
- Feature movida a "Hecho" en `spec/constitution/roadmap.md`.
- `docs/CAMBIOS.md` actualizada si existe.