# 12 · Catálogo: cards por categoría — Tareas

_Checklist accionable derivada del `plan.md`. Marca `[x]` al completarlas._

- [x] En `src/components/ServiceCatalog.tsx`, reemplazar el grid de 4 tarjetas por categoría por un grid `grid-cols-1 sm:grid-cols-2` de cards por categoría.
- [x] Cada card tiene como header el label de la categoría (`h3` font-display).
- [x] Agregar línea divisoria entre el header y la lista de servicios.
- [x] Renderizar la lista con todos los `ServiceType` de la categoría (nombre, descripción, precio, duración).
- [x] Añadir animación de entrada suave con `.reveal` y delay escalonado por card.
- [x] Conservar header de sección y skeleton de loading actuales.
- [x] Validar `pnpm build`, `pnpm lint` y `pnpm typecheck`.
- [x] Verificar 1 columna en mobile y 2 en `sm+`.
- [x] Verificar `prefers-reduced-motion` desactiva animaciones.
- [x] Actualizar `docs/CAMBIOS.md`.