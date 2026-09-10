# 12 · Catálogo: cards por categoría

**Estado:** propuesto
**Autor:** opencode
**Fecha:** 2026-09-10

## Contexto

El catálogo actual (`src/components/ServiceCatalog.tsx`) agrupa servicios por categoría usando un `h3` como título de sección + un grid de 4 tarjetas individuales por cada `ServiceType`. El cliente quiere que cada **categoría sea una sola card**: categoría como header, una línea divisoria y, debajo, la lista de todos sus servicios. Las cards se distribuyen de a **dos por fila** en la landing y de a **una** en mobile, con animación de entrada suave.

## Qué hace

1. Cada categoría del catálogo se renderiza como una **card** con:
   - **Header:** label de la categoría (font-display).
   - **Línea divisoria:** un `<hr>`/divisor sutil (`border-border/60`).
   - **Lista de servicios:** cada `ServiceType` de la categoría como fila (nombre, descripción, precio y duración).
2. Una categoría con varios `ServiceType` repite filas dentro de la misma card (se aplanan los `types` igual que hoy).
3. Grid responsive: `grid-cols-1 sm:grid-cols-2` → 1 columna en mobile, 2 en tablet/desktop.
4. Animación de entrada suave al hacer scroll: reutilizar `.reveal` + `IntersectionObserver` con **stagger** por card (delay incremental).

## Contexto técnico

- Componente a modificar: `src/components/ServiceCatalog.tsx`.
- Datos: `useServices()` → `{ categories, loading }` (`Category { id, label, services: Service[] }`, cada `Service` con `types: ServiceType[] { id, name, durationMinutes, price, description }`).
- El header de la sección ("Conocé todo lo que ofrecemos") y el skeleton de loading se conservan.
- Se reutilizan clases existentes: `.reveal`, `.lift-card` y tokens (`--background`, `--card`, `--border`, `--primary`, `--foreground-muted`).
- Se respeta `prefers-reduced-motion` (ya cubierto por CSS de `.reveal`/`.lift-card`).

## Criterios de aceptación

1. Cada categoría se muestra como una card con el label de la categoría como header.
2. Hay una línea divisoria entre el header de la card y la lista de servicios.
3. La lista muestra todos los `ServiceType` de la categoría (nombre, descripción, precio y duración).
4. Las cards se muestran de a **una** por fila en mobile (`grid-cols-1`) y de a **dos** en `sm+` (`sm:grid-cols-2`).
5. La animación de entrada es suave (fade + slide-up) y escalonada entre cards al entrar al viewport.
6. El header de la sección y el skeleton de loading actuales se conservan.
7. `pnpm build`, `pnpm lint` y `pnpm typecheck` pasan sin errores.
8. `prefers-reduced-motion: reduce` desactiva la animación.

## Fuera de alcance

- Cambios en el contrato de datos o en el backend.
- Cambios en la lógica de selección de servicios para reserva.
- Cambios en otras secciones de la landing.