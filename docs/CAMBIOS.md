# Registro de cambios

## 13 · Fusión "Sobre nosotros" + catálogo de servicios

- Fusionadas las secciones `ServiceCatalog` y `About` en una sola: `src/components/About.tsx` ahora contiene, en orden, el bloque "Sobre nosotros" (header, párrafo y las 3 tarjetas) y el bloque "Nuestros servicios" (`id="catalogo"`) con las 4 categorías del backend como tarjetas con **label + descripción**.
- Quitados **precios y duraciones** de la landing; las tarjetas de categoría muestran solo el texto descriptivo real del backend (`Category.description`).
- En el bloque "Sobre nosotros" quedan solo las **3 tarjetas** (se quitan el título "Excelencia en cada detalle" y el párrafo); las tarjetas usan el estilo semi-transparente del botón "MIS TURNOS" (fondo `bg-primary/20`, borde `2px solid var(--border)`, `backdropFilter: blur(4px)`).
- Las tarjetas del bloque "Sobre nosotros" se elevan con margen negativo (`-mt-12 sm:-mt-16`) y sin padding superior, montadas sobre el hero; con `relative z-70` quedan por encima del overlay del hero.
- Las 3 tarjetas se ven en **3 columnas también en mobile** (`grid-cols-3`, gap y padding reducidos en `sm` inferior para no apretarse).
- `src/components/ServiceCatalog.tsx` eliminado y removido su uso en `src/pages/LandingPage.tsx`.
- Se mantienen las anclas `id="servicios"` (sección) y `id="catalogo"` (bloque de servicios); los links de Hero y Footer a `#catalogo` siguen funcionando.
- Grid de categorías responsive (`grid-cols-1 sm:grid-cols-2`) con `.reveal` + `IntersectionObserver` re-observando los targets al terminar el `loading`, skeleton de carga y scroll-padding existente.
- Actualizado `spec/features/13-fusion-about-servicios/` (spec, plan, tasks) y movida la feature a "Hecho" en `spec/constitution/roadmap.md`.
- Validado `pnpm build`, `pnpm lint` y `pnpm typecheck` en verde.

## 12 · Catálogo: cards por categoría

- Rediseñado `src/components/ServiceCatalog.tsx`: cada categoría pasa de ser un título de sección con grid de 4 tarjetas a una **card única** con el label como header, línea divisoria y la lista de todos sus `ServiceType` (nombre, descripción, precio y duración).
- Grid responsive: `grid-cols-1 sm:grid-cols-2` (1 card por fila en mobile, 2 en `sm+`), cards con `bg-card`, borde y `lift-card`.
- Animación de entrada suave por scroll: `.reveal` + `IntersectionObserver` existente con `transitionDelay` escalonado (`i * 100ms`) por card; skeleton de loading ajustado al nuevo grid.
- Validado `pnpm build`, `pnpm lint` y `pnpm typecheck` en verde.

## 11 · Migración JS/JSX → TypeScript

- Creado `src/types/`: `models.ts` (Service, ServiceType, Category, Appointment, estados), `api.ts` (payloads/respuestas de la API + clase `ApiError` con códigos `NotFound`/`ContactMismatch`/`CannotCancel`/`CannotReschedule`/`SlotUnavailable`) y `context.ts` (valor tipado del `ServicesContext`). Shapes alineados con los schemas del backend (`mym-api-backend/app/schemas/*`, camelCase).
- Migrados a `.tsx`/`.ts` todos los archivos de `src/`: `App`, `main`, `router/AppRouter`, `pages/`, `components/` (incluyendo `booking/*`), `context/`, `hooks/useServices`, `lib/clientToken`, `services/api`. No quedan `.js`/`.jsx` en `src/`.
- Tipado de componentes: props con interfaces, eventos (`FormEvent`, `KeyboardEvent`), refs explícitos (`HTMLElement`/`HTMLInputElement`/`HTMLDivElement`) e íconos `LucideIcon`. `StepClient` ahora usa `z.infer<typeof schema>` como genérico de `useForm`.
- Tipado de `services/api.ts`: `fetchServices: Promise<Service[]>`, `fetchAvailableDates`/`fetchSlots` tipan respuestas del backend, `validateSlot` lanza `ApiError` con código `SlotUnavailable`, y las funciones públicas (`by-human-id`, cancelar, reprogramar) lanzan `ApiError` (`NotFound`, `ContactMismatch`, `CannotCancel`, `CannotReschedule`).
- Creado `src/vite-env.d.ts`: referencia a `vite/client` y tipado de `ImportMetaEnv` (`VITE_API_URL`, `VITE_CLIENT_TOKEN_SECRET`) — antes `import.meta.env` era `any`.
- Creado `tsconfig.json`: `strict`, `moduleResolution: "bundler"`, `jsx: "react-jsx"`, `paths` alias `@/*`.
- Configurado el alias `@/` en `vite.config.js` (`resolve.alias`) y usados imports con `@/` en todo `src/` (convención de la constitución).
- Punto de entrada: `index.html` ahora apunta a `/src/main.tsx`.
- ESLint: instalado `typescript-eslint` (dev dep) y actualizado `eslint.config.js` para lintear `*.{ts,tsx}` además de `*.{js,jsx}`. Nota: como typescript-eslint 8.x no soporta TS 7.0 (no expone API estable aún), `typescript` pasa a `npm:@typescript/typescript6@^6.0.2` (paquete de compatibilidad oficial de TS) y `typecheck` usa `tsc6 --noEmit` (mismo motor TS 6). `pnpm typecheck`, `pnpm lint` y `pnpm build` en verde.

## 01 · Landing page

- Configurado Tailwind CSS 4 como plugin de Vite (`@tailwindcss/vite`).
- Actualizado `index.html`: `lang="es"`, título "Tammi", Google Fonts (Fraunces + Nunito Sans).
- Reescrito `src/index.css`: tokens CSS del proyecto (`--primary`, `--accent`, `--background`, `--foreground`), utilidades `.reveal` y `.lift-card`, soporte `prefers-reduced-motion`.
- Creado `src/components/Hero.jsx`: sección full-screen con imagen difuminada, overlay sepia/rosado, grid 2 columnas, volanta, título, bajada, 2 botones CTA.
- Creado `src/components/About.jsx`: sección con fondo crema, layout asimétrico, volanta, título, párrafo, 3 tarjetas con íconos SVG.
- Reemplazado `src/App.jsx`: eliminado boilerplate de Vite, importados Hero y About.
- Eliminado `src/App.css`.

## 02 · Navbar

- Creado `src/components/Navbar.jsx`: nav fijo arriba, botón CTA "Reservá tu turno" a la derecha, fondo transparente.
- Agregado `scroll-padding-top: 80px` en `src/index.css` para compensar el nav fijo.
- Importado `<Navbar />` en `src/App.jsx` antes de `<Hero />`.

## 03 · Catálogo de servicios

- Creado `src/components/ServiceCatalog.jsx`: sección interactiva con pestañas por categoría, grid 2 columnas (imagen dinámica + lista de servicios), animaciones `.reveal` y `.lift-card`.
- Importado `<ServiceCatalog />` en `src/App.jsx` entre `<Hero />` y `<About />`.

## 04 · Pre-Footer Banner

- Creado `src/components/PreFooterBanner.jsx`: sección CTA con fondo terracota, volanta + título a la izquierda, botón "Reservá tu turno" a la derecha apuntando a `/reserva`.
- Importado `<PreFooterBanner />` en `src/App.jsx` debajo de `<About />`.

## 05 · Footer

- Creado `src/components/Footer.jsx`: footer con fondo marrón oscuro, grilla 4 columnas (Marca, Servicios, Contacto, Redes), barra inferior con crédito.
- Importado `<Footer />` en `src/App.jsx` como último elemento.

## 06 · Booking engine

- Configurado React Router en `src/router/AppRouter.jsx` con rutas `/` (landing) y `/reserva` (booking).
- Movido contenido de la landing a `src/pages/LandingPage.jsx`.
- Creado `src/pages/BookingPage.jsx`: wizard full-screen de 3 pasos con estado compartido.
- Creado `src/components/booking/StepServices.jsx`: selección múltiple de servicios con toggle.
- Creado `src/components/booking/StepDateTime.jsx`: grilla de 14 días + horarios de `TIME_SLOTS`.
- Creado `src/components/booking/StepClient.jsx`: formulario con React Hook Form + Zod.
- Creado `src/components/booking/StepConfirm.jsx`: resumen del turno + botón "Volver al inicio".
- Actualizado `src/App.jsx` para importar `<AppRouter />`.


## 07 · Reserva anónima conectada al backend

- Creado `src/lib/clientToken.js`: firma el JWT de reserva anónima (HMAC-SHA256 con Web Crypto) usando `VITE_CLIENT_TOKEN_SECRET`; persiste el `jti` y el token en `localStorage`; reemite el token si venció (`exp` 90 días). Claims: `sub=web-client`, `jti`, `client_version`, `iat`, `exp`.
- Actualizado `src/services/api.js`: `createAppointment` ahora envía el header `X-Client-Token` y los datos del cliente (`clientName`/`clientPhone`/`clientEmail`); mapea errores del backend (401, 400 ClientDataRequired, 409 SlotUnavailable) a mensajes claros; el fallback offline conserva los campos del cliente.
- Actualizado `src/pages/BookingPage.jsx`: al confirmar (paso 3) llama `createAppointment`; maneja estados `submitting`/`submitError`; muestra el error y permite reintentar; en éxito pasa a la confirmación con el turno real.
- Actualizado `src/components/booking/StepClient.jsx`: muestra el error de creación (rol="alert"), deshabilita el botón mientras reserva ("Reservando…").
- Actualizado `src/components/booking/StepConfirm.jsx`: muestra el `humanId` real del turno cuando la creación es exitosa.
- Agregado `VITE_CLIENT_TOKEN_SECRET` a `.env.example` (sin valor) y `.env.local` (dev, gitignored).

## 08 · Mis turnos

- Creado `src/pages/MyBookingsPage.jsx`: página `/mis-turnos` con layout, título, botón "Volver al inicio" y componente `BookingLookup`.
- Creado `src/components/BookingLookup.jsx`: formulario de búsqueda por `humanId` (input alfanumérico + botón), maneja estados loading/error/notFound/result. Focus automático al montar.
- Creado `src/components/AppointmentCard.jsx`: tarjeta del turno con humanId, badge de estado (6 estados con colores), cliente, fecha/hora, duración, lista de servicios con precios, total, y botones "Reprogramar"/"Cancelados" condicionados por el estado.
- Creado `src/components/CancelAppointmentModal.jsx`: modal con textarea de motivo (opcional), input de verificación (email o teléfono), manejo de errores 403 ContactMismatch y 409 CannotCancel.
- Creado `src/components/RescheduleModal.jsx`: modal con inputs de fecha/horario, input de verificación, manejo de errores 403 ContactMismatch, 409 SlotUnavailable y 409 CannotReschedule.
- Actualizado `src/services/api.js`: agregadas 3 funciones públicas (sin `X-Client-Token`) — `fetchAppointmentByHumanId` (GET), `cancelAppointmentByHumanId` (PATCH), `rescheduleAppointmentByHumanId` (POST). Mapeo de errores del backend feature 009.
- Actualizado `src/router/AppRouter.jsx`: agregada ruta `/mis-turnos`.
- Actualizado `src/components/Navbar.jsx`: agregado botón de texto "Mis turnos" al lado del botón RESERVAR.

## 08b · Validación de disponibilidad antes de confirmar

- Creado `src/services/api.js` → `validateSlot`: llama a `GET /availability/validate` antes de crear la cita. Lanza `SlotUnavailable` cuando el horario ya no está libre.
- Creado `src/components/booking/SlotUnavailableModal.jsx`: modal que informa que el turno no está disponible y ofrece dos opciones — "Elegir otro turno" (vuelve al paso 1 del stepper) o "Volver al inicio" (redirige a la landing).
- Actualizado `src/pages/BookingPage.jsx`: `handleConfirm` ahora valida la disponibilidad con `validateSlot` antes de llamar a `createAppointment`. Si la validación falla con `SlotUnavailable`, abre el modal. Al reprogramar se limpian fecha/hora y se vuelve al paso 1. Al elegir volver al inicio se limpian los servicios seleccionados y se navega a `/`.

## 09a · Performance: code splitting y limpieza

- Actualizado `src/router/AppRouter.jsx`: `BookingPage` y `MyBookingsPage` ahora se cargan con `React.lazy` + `Suspense`. El JS inicial baja de 116,5 KB a 82,5 KB gzip (-29%); el bundle del flujo de reserva (React Hook Form + Zod) solo se descarga en `/reserva`.
- Limpiado `src/services/api.js`: eliminado código muerto del mock (`delay`, `MOCK_SERVICES`) que quedaba tras el early return de la llamada real (además referenciaba identificadores inexistentes); aplanado el condicional `if (BASE_URL)` que siempre era verdadero.
- Actualizado `src/components/ServiceCatalog.jsx`: eliminado el anti-patrón de `setState` síncrono dentro de un effect; la categoría activa ahora se deriva durante el render con fallback a la primera categoría (`activeCategory?.id` en tabs, panel y deps del IntersectionObserver).
- Agregado `<meta name="description">` en `index.html` para SEO.
- Creado `public/robots.txt` (`User-agent: * / Allow: /`): antes el servidor respondía con el HTML de la SPA y Lighthouse lo marcaba como inválido.
- Ajustado el logo del footer en `src/components/Footer.jsx` para que sea responsive (`w-full max-w-50` en la columna, `max-w-36 sm:max-w-44` en la imagen).
- Self-hosteadas las fuentes con `@fontsource-variable/fraunces` y `@fontsource-variable/nunito-sans` (pnpm): eliminados los links a fonts.googleapis.com/gstatic de `index.html` (render-blocking, ~330 ms); importados en `src/main.jsx` y actualizados `--font-display`/`--font-body` en `src/index.css` a las familias `* Variable`. Solo estilos normales (no se usan cursivas) con subsets por `unicode-range`.
- Convertida `src/assets/hero.png` (566 KB) a `hero.webp` (131 KB, calidad 80) y actualizado el import en `src/components/Hero.jsx`.

## 09b · Cambio de identidad MyM

- Actualizado `index.html`: título y meta description a **MyM**, carga de Google Fonts (Playfair Display + Plus Jakarta Sans) vía link preconnect.
- Actualizados los tokens en `src/index.css` a la paleta negro + dorado: fondo `#0f0f0f`, cards `#1a1a1a`, acento `#e2a872` (light `#f4d3b4`), texto `#ffffff`/`#a0a0a0`, borde `#2a2a2a`. Tipografías: `--font-display: "Playfair Display"` y `--font-body: "Plus Jakarta Sans"`.
- Quitados los imports self-hosted `@fontsource-variable/fraunces` y `@fontsource-variable/nunito-sans` de `src/main.jsx` (las fuentes ahora vienen de Google Fonts).
- Actualizado `src/components/Navbar.jsx`: agregado wordmark "MyM"; botones "MIS TURNOS" y "RESERVAR" en estilo oscuro, CTA con fondo dorado y texto oscuro.
- Actualizado `src/components/Hero.jsx`: overlay oscuro, textos premium ("Belleza que se nota"), CTA dorado, botón secundario estilo outline oscuro.
- Actualizado `src/components/About.jsx`: título "Excelencia en cada detalle", textos premium, cards con fondo token `--secondary` y borde.
- Actualizado `src/components/PreFooterBanner.jsx`: texto "Reservá tu turno y viví la experiencia MyM", CTA dorado.
- Actualizado `src/components/Footer.jsx`: alt "MyM", textos premium, dirección "Buenos Aires", handle `@MyM`, crédito "MyM Salón de belleza".
- Eliminadas todas las referencias a "Tammi", "barrio", "como en casa" y "calidez de casa".

## 10 · Landing scroll único + reserva y catálogo

- Creado `src/components/BookingSection.jsx`: la reserva pasa a ser una **sección** (ancla `#reserva`) dentro de la landing, reutilizando el wizard `booking/*` (StepServices → StepDateTime → StepClient → StepConfirm) y el manejo de errores (401/400/409, `SlotUnavailable`). "Volver al inicio" hace scroll al tope en lugar de navegar a otra ruta.
- Eliminado `src/pages/BookingPage.jsx` y su import lazy: la reserva ahora vive dentro de la landing.
- Actualizado `src/pages/LandingPage.jsx`: se integra `<BookingSection />` entre `About` y `PreFooterBanner`.
- Actualizado `src/router/AppRouter.jsx`: eliminada la ruta `/reserva`; `ScrollToTop` ahora resuelve hashes (`/#reserva`) con `scrollIntoView({ behavior: 'smooth' })`. Se mantienen `/#` y `/mis-turnos`.
- Actualizado `src/components/Navbar.jsx`: logo MyM y botones pasan a `react-router` `Link`; RESERVAR apunta a `/#reserva`.
- Actualizado `src/components/Hero.jsx`: CTA principal apunta a `/#reserva` (ancla de scroll), se mantiene el de "servicios" a `#catalogo`.
- Rediseñado `src/components/ServiceCatalog.jsx`: se reemplaza el sistema de **tabs** por un **grid de tarjetas elegantes** agrupadas por categoría con selección múltiple; el CTA "Reservar turno" apunta a `/#reserva` y se deshabilita sin servicios seleccionados.
- Actualizado `src/components/PreFooterBanner.jsx`: CTA "Reservar turno" pasa a `Link` a `/#reserva`.
- Agregados tokens `--color-card`/`--color-accent-foreground` en `src/index.css` (usados por el wizard y las tarjetas).
- Ajustes de dark theme en el wizard: botones primarios `bg-primary text-white` → `text-background`; `bg-white` de confirmación → token card; h1 de pasos → h2 por jerarquía.
