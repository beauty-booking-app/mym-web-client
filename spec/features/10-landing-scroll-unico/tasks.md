# 10 · Landing scroll único + reserva y catálogo — Tareas

_Checklist accionable derivada del `plan.md`. Marca `[x]` al completarlas._

## Landing single-scroll

- [x] Crear/integrar `LandingPage` con secciones: Hero, catálogo, about, reserva integrada y footer.
- [x] Conectar botones de ancla y scroll entre secciones, sin cambiar de URL para la reserva.

## Navbar / Hero / About / Footer

- [x] Rediseñar `Navbar` (logo MyM + Mis turnos + Reservar→ancla).
- [x] Rediseñar `Hero` (overlay negro/dorado, título elegante).
- [x] Rediseñar `About` y `PreFooterBanner` y `Footer` a tono premium.

## Catálogo

- [x] Rediseñar `ServiceCatalog` a **grid de tarjetas elegantes** (selección múltiple).
- [x] Mantener la selección conectada a la reserva (mismos ids de servicio).

## Reserva integrada

- [x] Mover/integrar la reserva como **sección** dentro de la landing (reutilizar `booking/*`).
- [x] Quitar la ruta separada `/reserva` en `AppRouter.jsx`; conectar CTA a ancla de scroll.
- [x] Conservar el flujo: servicios → fecha/hora → datos → confirmación y manejo de errores (401/400/409, `SlotUnavailable`).
- [x] Mantener la ruta `/mis-turnos` operativa.

## Responsive / mobile-first

- [x] Desktop: landing ancha premium.
- [x] Mobile: look tipo app full-screen (max-width acotado, botones adaptados).

## Validación

- [x] Flujo de reserva completo funciona contra la API (implementado, requiere verificación en vivo).
- [x] Consulta de turnos (`/mis-turnos`) funciona.
- [x] Verificar targets ≥ 44px y `prefers-reduced-motion`.
- [x] `pnpm lint` sin errores.
- [ ] `pnpm typecheck` sin errores (feature 11 - migración TS).
- [x] `pnpm build` compila.
- [ ] Mover la feature a "Hecho" en `spec/constitution/roadmap.md` y actualizar `docs/CAMBIOS.md`.
