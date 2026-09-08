# 10 · Landing scroll único + reserva y catálogo

**Estado:** propuesta (pendiente de aprobación)

## Contexto

Ya aplicada la identidad MyM (paleta negro+dorado, tipografías premium, nombre — feature 09), reestructuramos la **navegación y el layout** de la landing: el sitio deja de "cambiar de página" para navegar por secciones mediante scroll vertical. La reserva y el catálogo pasan a formar parte de ese scroll único.

## Qué hace

1. **Landing single-scroll:** el sitio navega por secciones desplazándose verticalmente (sin cambiar de URL para la reserva). Incluye: Hero, catálogo de servicios, "sobre nosotros", reserva integrada y footer.
2. **Reserva integrada en el scroll:** la `BookingPage` deja de ser una ruta separada (`/reserva`) y pasa a ser una **sección/ancla** dentro de la landing, conservando el flujo de pasos existente (servicios → fecha/hora → datos → confirmación) y su integración con la API.
3. **Catálogo en grid de tarjetas elegantes:** reemplazar el sistema de pestañas (tabs) por un grid de tarjetas grandes estilo reference ("Popular services"), con selección múltiple funcional.

## Por qué

- El cliente quiere una experiencia premium de landing continua, más acorde al posicionamiento deluxe.
- La reserva integrada reduce fricción: el usuario reserva sin salir de la landing.
- Mobile-first: el scroll único da una experiencia tipo app, prioritaria porque la mayoría de las reservas se hacen desde el celular.

## Criterios de aceptación

### Landing single-scroll
- [ ] La landing navega por scroll (secciones/anclas, botones de ancla), sin cambiar de URL para la reserva.
- [ ] Incluye las secciones: Hero, catálogo de servicios, "sobre nosotros", reserva integrada y footer.

### Reserva integrada
- [ ] La sección de reserva está integrada como parte del scroll único y mantiene el flujo funcional previo: selección de servicios → fecha/hora → datos → confirmación, con los mismos llamados a la API.
- [ ] Se elimina la ruta separada `/reserva` en `AppRouter.tsx`; el CTA "Reservar" hace scroll a la sección de reserva.
- [ ] El manejo de errores (401/400/409, `SlotUnavailable`) se conserva.
- [ ] La ruta `/mis-turnos` se mantiene operativa.

### Catálogo
- [ ] El catálogo muestra las categorías/servicios en un **grid de tarjetas elegantes** (no tabs), con selección múltiple funcional.
- [ ] La selección de servicios se mantiene conectada a la reserva (mismos ids de servicio).

### Responsive / mobile-first
- [ ] En desktop se ve una landing ancha premium con secciones centradas.
- [ ] En mobile (ancho ≤ `sm`) la experiencia se asemeja a una app full-screen (contenido de ancho móvil, botones adaptados), con un `max-width` acotado.
- [ ] Todo lo funcional (reserva, catálogo, consulta de turnos) sigue operativo en ambas variantes.

## Fuera de alcance

- Cambio de identidad (nombre, paleta, tipografías) → feature **09**.
- Migración JS/JSX → TS/TSX → feature **11**.
- Modificaciones al backend (`api/`) o al panel admin (`admin/`).
- Nuevas funcionalidades de reserva (pagos, recordatorios, valoraciones).
- Cambios en los criterios de disponibilidad o reglas de negocio.
- Cambio del contrato de datos con la API.

## Referencia

Los mockups de estilo están en `spec/diseño base/hairaura_home.html`, `hairaura_booking.html` y `hairaura_onboarding.html`. No son estructuras a copiar literalmente: son referencia de layout, cards, botones pill dorados y look de app móvil.
