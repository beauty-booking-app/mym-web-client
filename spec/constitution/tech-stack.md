# Tech stack y convenciones


## Tecnologías

- **Lenguaje:** TypeScript
- **Framework / runtime:** React 19.2, Vite 8.1, Tailwind CSS 4
- **Íconos:** Lucide React
- **Base de datos:** Backend externo. Entidades definidas en `src/entities/` como JSON schemas (`Appointment`).
- **Tests:** ninguno
- **Despliegue:** Vía `vite build`.
- **pnpm** como package manager


## Archivos / módulos clave

- `src/main.tsx` — Punto de entrada: renderiza `<App />` en el DOM.
- `src/App.tsx` — Componente raíz: `<ServicesProvider>` + `<AppRouter />`.
- `src/components/Hero.tsx` — Sección hero full-screen: imagen difuminada, overlay cálido, grid 2 columnas, CTA.
- `src/components/About.tsx` — Sección About: fondo crema, layout asimétrico, tarjetas con íconos.
- `src/components/ServiceCatalog.tsx` — Catálogo de servicios: grid de tarjetas por categoría con selección múltiple.
- `src/components/PreFooterBanner.tsx` — Banner CTA: fondo terracota, volanta + título, botón "Reservá tu turno".
- `src/components/Footer.tsx` — Footer: fondo marrón oscuro, grilla 4 columnas, barra inferior.
- `src/components/BookingSection.tsx` — Sección de reserva (`#reserva`): wizard de 3 pasos + confirmación.
- `src/components/booking/Step*.tsx` — Pasos del wizard (servicios, fecha/hora, datos con Zod, confirmación).
- `src/pages/LandingPage.tsx` — Página de la landing (scroll único).
- `src/pages/MyBookingsPage.tsx` — Página de consulta de turnos por código de seguimiento.
- `src/components/BookingLookup.tsx` — Formulario de búsqueda + tarjeta de resultado del turno.
- `src/router/AppRouter.tsx` — Configuración de rutas (React Router), lazy loading de `/mis-turnos`.
- `src/components/Navbar.tsx` — Nav fijo flotante: botones "Mis turnos" y "RESERVAR".
- `src/context/ServicesContext.tsx` — Proveedor de servicios + selección compartida (persistido en memoria).
- `src/hooks/useServices.ts` — Hook para consumir el `ServicesContext`.
- `src/services/api.ts` — Cliente HTTP tipado (disponibilidad, citas, consulta/cancelación/reprogramación).
- `src/lib/clientToken.ts` — Token de reserva anónima (JWT HS256 con Web Crypto).
- `src/types/` — Interfaces TS compartidas (`models.ts`, `api.ts`, `context.ts`, `vite-env.d.ts`).
- `src/entities/Appointment.jsonc` — Schema JSON de la entidad Appointment (referencia).
- `src/index.css` — Estilos globales: Tailwind import, tokens CSS (paleta, tipografía), utilidades `.reveal`, `.lift-card`.

## Comandos

```bash
pnpm dev        # arranca el dev server de Vite
pnpm build      # compila para producción
pnpm start      # sirve la build de producción (alias de preview)
pnpm lint       # revisa estilo con ESLint (JS y TS via typescript-eslint)
pnpm lint:fix   # corrige automáticamente lo que pueda
pnpm typecheck  # chequeo de tipos (tsc6 --noEmit, TypeScript 6 por compatibilidad con typescript-eslint)
pnpm preview    # vista previa de la build de producción
```

## Modelo de datos / dominio

### Appointment (Turno)

| Campo | Tipo | Reglas |
|-------|------|--------|
| `client_name` | string | Requerido. Nombre y apellido. |
| `client_email` | string (email) | Requerido. Email del cliente. |
| `client_phone` | string | Opcional. Teléfono con formato argentino. |
| `services` | string[] | Requerido. Lista de nombres de servicios (no IDs). |
| `appointment_date` | string | Requerido. Formato `YYYY-MM-DD`. |
| `appointment_time` | string | Requerido. Formato `HH:MM`. Debe pertenecer a `TIME_SLOTS`. |
| `notes` | string | Opcional. Comentarios o preferencias. |
| `status` | enum | `pending` / `confirmed` / `cancelled`. Default: `pending`. |

### Catálogo de servicios (cargado desde el backend vía `GET /public/services`)

Cada `Service` tiene: `id`, `name`, `description`, `referenceImage`, `cancelable`, `cancellationPeriodHours` y un array de `types` (cada uno con `id`, `name`, `description`, `durationMinutes`, `price`). El `ServicesContext` deriva las **categorías** (Corte, Tratamientos, Color, Uñas) del nombre del service o del campo `category` del mock, y expone la lista plana `allTypes`.

`TIME_SLOTS`: 10 turnos horarios de 09:00 a 19:00, sin 13:00.

## Convenciones

- **Idioma:** todo el contenido visible al usuario en español argentino.
- **Idioma del código:** TypeScript estricto. Sin `any` sin justificar.
- **Nombres de archivos:** componentes en PascalCase (`BookingEngine.tsx`), utilidades en kebab-case (`client-token.ts`), hooks en kebab-case con prefijo `use-` (`use-services.ts`).
- **Imports:** usar alias `@/` mapeado en `tsconfig.json` (paths) y `vite.config.js` (resolve.alias) (ej. `@/components/booking/StepClient`, `@/services/api`).
- **Formularios:** React Hook Form + Zod (paquetes ya instalados: `react-hook-form`, `zod`, `@hookform/resolvers`).
- **Estilos:** Tailwind CSS 4 utility-first vía `@tailwindcss/vite`. No hay CSS modules ni styled-components.
- **Accesibilidad:** `aria-label`, `aria-pressed`, `aria-modal`, `role="dialog"`, targets mínimo 44px, `prefers-reduced-motion` respetado.
- **No hay tests:** la validación es lint + typecheck. Si se agregan tests en el futuro, usar Vitest.

## Estilo visual

- **Paleta:** terracota (`--primary: hsl(14, 52%, 56%)`) para botones/accent, sage (`--accent: hsl(90, 22%, 50%)`) para confirmaciones, crema (`--background: hsl(30, 33%, 97%)`) para fondos, marrón oscuro (`--foreground: hsl(25, 35%, 22%)`) para texto.
- **Tipografías:** Fraunces (display/headings) + Nunito Sans (cuerpo), cargadas desde Google Fonts.
- **Tokens:** usar las variables CSS definidas en `index.css` (`--primary`, `--accent`, `--background`, `--foreground`, etc.) en vez de valores hardcodeados.
- **Layout:** padding lateral `px-[6%] sm:px-[8%]` consistente en todas las secciones. Breakpoints de Tailwind (sm, lg).
- **Animaciones:** `.reveal` (fade-in + slide-up on scroll), `.lift-card` (hover elevación), transiciones escalonadas en Hero. Respetar `prefers-reduced-motion: reduce`.
- **Border radius:** `rounded-full` para botones, `rounded-2xl` para cards, `rounded-3xl` para imágenes grandes.

## Límites duros

- No agregar dependencias sin evaluar. Verificar antes de instalar algo nuevo.
- No commitear `.env*` ni `node_modules/`.
- No hardcodear valores de colores: usar las variables CSS de `index.css`.
- No romper la paleta ni la tipografía sin actualizar las variables CSS en `index.css`.
- No desactivar la accesibilidad (targets 44px, aria labels, reduced-motion).
- No cambiar el idioma del contenido visible al usuario (siempre español argentino).
- No montar rutas nuevas sin verificar que el componente esté importado en `App.tsx`.
