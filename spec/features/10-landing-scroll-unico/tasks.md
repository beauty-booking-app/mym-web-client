# 10 · Landing scroll único + reserva y catálogo — Tareas

_Checklist accionable derivada del `plan.md`. Marca `[x]` al completarlas._

## Landing single-scroll

- [ ] Crear/integrar `LandingPage` con secciones: Hero, catálogo, about, reserva integrada y footer.
- [ ] Conectar botones de ancla y scroll entre secciones, sin cambiar de URL para la reserva.

## Navbar / Hero / About / Footer

- [ ] Rediseñar `Navbar` (logo MyM + Mis turnos + Reservar→ancla).
- [ ] Rediseñar `Hero` (overlay negro/dorado, título elegante).
- [ ] Rediseñar `About` y `PreFooterBanner` y `Footer` a tono premium.

## Catálogo

- [ ] Rediseñar `ServiceCatalog` a **grid de tarjetas elegantes** (selección múltiple).
- [ ] Mantener la selección conectada a la reserva (mismos ids de servicio).

## Reserva integrada

- [ ] Mover/integrar la reserva como **sección** dentro de la landing (reutilizar `booking/*`).
- [ ] Quitar la ruta separada `/reserva` en `AppRouter.tsx`; conectar CTA a ancla de scroll.
- [ ] Conservar el flujo: servicios → fecha/hora → datos → confirmación y manejo de errores (401/400/409, `SlotUnavailable`).
- [ ] Mantener la ruta `/mis-turnos` operativa.

## Responsive / mobile-first

- [ ] Desktop: landing ancha premium.
- [ ] Mobile: look tipo app full-screen (max-width acotado, botones adaptados).

## Validación

- [ ] Flujo de reserva completo funciona contra la API.
- [ ] Consulta de turnos (`/mis-turnos`) funciona.
- [ ] Verificar targets ≥ 44px y `prefers-reduced-motion`.
- [ ] `pnpm lint` sin errores.
- [ ] `pnpm typecheck` sin errores.
- [ ] `pnpm build` compila.
- [ ] Mover la feature a "Hecho" en `spec/constitution/roadmap.md` y actualizar `docs/CAMBIOS.md`.
