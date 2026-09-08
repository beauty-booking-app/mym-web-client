# 10 · Landing scroll único + reserva y catálogo — Plan

**Estado:** implementado

## Objetivo técnico

Convertir la reserva en una sección/ancla dentro de la landing y cambiar el catálogo de tabs a grid, manteniendo intacta la lógica de negocio y el consumo de la API. Es un cambio de **estructura de páginas y presentación**.

## Decisiones de diseño

1. **Landing single-scroll:** una sola página con secciones (Hero, catálogo, about, reserva, footer) y anclas.
2. **Reserva integrada como sección:** para no duplicar lógica, se reutilizan los componentes del wizard existentes (`StepServices`, `StepDateTime`, `StepClient`, `StepConfirm`, `SlotUnavailableModal`), movidos dentro de la landing en lugar de una ruta separada.
   - Se elimina la ruta `/reserva`; el botón "Reservar" hace scroll a la sección de reserva.
   - `STEP_SERVICES`/`handleConfirm`/`handleReschedule` actuales se conservan tal cual.
3. **Catálogo en grid de tarjetas:** reemplazar `ServiceCatalog` (tabs) por un grid de tarjetas grandes con selección múltiple (manteniendo `useServices` y los ids de servicio para la reserva).

## Estructura propuesta

```
src/
├── pages/
│   └── LandingPage.tsx          # landing single-scroll: Hero, catálogo, about, reserva, footer
├── components/
│   ├── Hero.tsx                 # hero premium (ya con identidad de la feature 09)
│   ├── ServiceCatalog.tsx       # grid de tarjetas elegantes (reemplaza tabs)
│   ├── About.tsx                # sección "sobre nosotros"
│   ├── PreFooterBanner.tsx      # CTA premium
│   ├── Footer.tsx               # footer MyM
│   ├── Navbar.tsx               # nav con logo MyM + Mis turnos + Reservar→ancla
│   └── booking/                 # wizard reutilizado (pasos) dentro de la landing
│       ├── StepServices.tsx
│       ├── StepDateTime.tsx
│       ├── StepClient.tsx
│       ├── StepConfirm.tsx
│       └── SlotUnavailableModal.tsx
└── router/AppRouter.tsx         # se mantiene "/" y "/mis-turnos"; se elimina "/reserva"
```

> La ruta `/mis-turnos` se **mantiene** (consulta de turnos por código); solo deja de existir la ruta separada de reserva.

## Pasos de implementación (orden)

1. Rediseñar `Navbar` (logo MyM + Mis turnos + Reservar→ancla).
2. Rediseñar `Hero` (overlay negro/dorado, título elegante).
3. Rediseñar `ServiceCatalog` a **grid de tarjetas elegantes** (selección múltiple).
4. Rediseñar `About`, `PreFooterBanner` y `Footer`.
5. Mover/integrar la reserva como **sección** dentro de `LandingPage` (reutilizar `booking/*`).
6. Quitar la ruta separada `/reserva` en `AppRouter.tsx`; conectar CTA a ancla de scroll.
7. Mantener la ruta `/mis-turnos` operativa.
8. Ajustar responsive/mobile-first.
9. Validar funcionalidad de reserva y mis turnos contra la API.
10. `pnpm lint`, `pnpm typecheck`, `pnpm build`.

## Riesgos

- **Rompimiento del flujo de reserva:** mitigado reutilizando los componentes existentes sin tocar la lógica.
- **API desplegada en Vercel:** no se toca el contrato; solo cambia la presentación y la integración en una página.

## Criterios de "done"

- Feature verificada contra `spec.md` (criterios de aceptación todos marcados).
- `lint` / `typecheck` / `build` en verde.
- Feature movida a "Hecho" en `spec/constitution/roadmap.md`.
- `docs/CAMBIOS.md` actualizada si existe.
