# 13 · Fusionar "Sobre nosotros" con el catálogo de servicios — Tareas

_Checklist accionable derivada del `plan.md`. Marca `[x]` al completarlas._

- [x] Extender `src/components/About.tsx`: agregar bloque "Nuestros servicios" (`id="catalogo"`) debajo de las 3 tarjetas, con encabezado, skeleton y grid de categorías (label + descripción, sin precio/duracion).
- [x] Ajustar el `IntersectionObserver` de `About.tsx` para re-observar los `.reveal` al terminar el `loading`.
- [x] Quitar `<ServiceCatalog />` y su import en `src/pages/LandingPage.tsx`.
- [x] Eliminar `src/components/ServiceCatalog.tsx`.
- [x] Verificar que las anclas `#servicios` y `#catalogo` (Hero y Footer) sigan funcionando.
- [x] Validar `pnpm lint`, `pnpm build` y `pnpm typecheck` sin errores.
- [x] Validar contra los criterios de aceptación de `spec.md`.
- [x] Documentar en `docs/CAMBIOS.md`.
- [x] Mover la feature a "Hecho" en `../../constitution/roadmap.md`.

## Mantenimiento (checklist recurrente)

- [ ] Si el backend cambia `description` de los servicios, la sección se actualiza sola (texto viene de la API).