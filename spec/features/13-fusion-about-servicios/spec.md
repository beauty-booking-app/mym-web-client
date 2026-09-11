# 13 · Fusionar "Sobre nosotros" con el catálogo de servicios

**Estado:** propuesta
**Autor:** opencode
**Fecha:** 2026-09-11

## Contexto

Hoy la landing renderiza dos secciones consecutivas:

- `ServiceCatalog` → "Nuestros servicios" (`id="catalogo"`), que lista cada `ServiceType` con **precio y duración**.
- `About` → "Sobre nosotros" (`id="servicios"`), con el párrafo institucional y 3 tarjetas de alto nivel (Peluquería, Belleza de uñas, Atención premium).

El cliente quiere **una sola sección**: primero un texto "sobre nosotros" y a continuación los servicios. No se deben mostrar **precios ni tiempos**; en su lugar se muestran las **descripciones de cada categoría**, al estilo de las tarjetas del About.

## Qué hace

1. Fusiona `ServiceCatalog` y `About` en una única sección con dos bloques verticales:
   - **Bloque "Sobre nosotros"** (arriba): eyebrow, título, párrafo y las 3 tarjetas actuales (Peluquería, Belleza de uñas, Atención premium). Se conservan tal como están.
   - **Bloque "Nuestros servicios"** (abajo): encabezado de la sección de servicios y las **4 categorías** (Corte, Tratamientos, Color, Uñas) como tarjetas con su **label + descripción**. Sin precio ni duración.
2. Las descripciones salen del dato real `Category.description` (derivado en `ServicesContext` a partir del `description` del `Service` que devuelve el backend; p. ej. Color → "Coloración global y técnicas de mechas").
3. Las anclas siguen funcionando igual:
   - `#servicios` → inicio de la sección fusionada.
   - `#catalogo` → inicio del bloque "Nuestros servicios" (destino del CTA del Hero y de los links del Footer).
4. Grid de categorías responsive: **1 columna** en mobile y **2** en `sm+`, con animación de entrada escalonada (`.reveal`), igual que hoy.
5. Se elimina `src/components/ServiceCatalog.tsx` y su import en `LandingPage`.

## Contexto técnico

- Componentes: `src/components/About.tsx` (se extiende) y `src/components/ServiceCatalog.tsx` (se elimina).
- Página: `src/pages/LandingPage.tsx` (se quita `<ServiceCatalog />`).
- Datos: `useServices()` → `{ categories, loading }`. `Category { id, label, description, image, services: Service[] }`; cada `Service` tiene `types: ServiceType[]`.
- Se reutilizan clases y tokens existentes: `.reveal`, `.lift-card`, `--background`, `--secondary`, `--card`, `--border`, `--primary`, `--foreground`, `--foreground-muted`, `--font-display`.
- El bloque "Sobre nosotros" conserva el fondo `--secondary`; las tarjetas de categoría usan el estilo card actual (`bg-card`, `border-border`, `rounded-2xl`).
- Mientras `loading` es `true`, el bloque de servicios muestra un skeleton; el bloque "Sobre nosotros" se renderiza de inmediato.
- Se respeta `prefers-reduced-motion` (ya cubierto por `.reveal`/`.lift-card`).

## Criterios de aceptación

1. La landing muestra **una sola sección** que contiene, en orden, "Sobre nosotros" y luego los servicios.
2. El bloque "Sobre nosotros" conserva el párrafo y las 3 tarjetas actuales (Peluquería, Belleza de uñas, Atención premium).
3. El bloque de servicios muestra las 4 categorías como tarjetas con label + descripción.
4. **No** se muestra precio ni duración de ningún servicio en la landing.
5. Las tarjetas de categoría se distribuyen 1 por fila en mobile y 2 en `sm+`.
6. La animación de entrada es suave (fade + slide-up) y escalonada entre tarjetas al entrar al viewport.
7. Los enlaces `#servicios` y `#catalogo` siguen llevando a la sección correcta (Hero y Footer sin cambios funcionales).
8. `ServiceCatalog.tsx` ya no existe y `LandingPage` no lo importa.
9. `pnpm build`, `pnpm lint` y `pnpm typecheck` pasan sin errores.
10. `prefers-reduced-motion: reduce` desactiva la animación.

## Fuera de alcance

- Cambios en el contrato de datos, en el backend o en `ServicesContext`.
- Cambios en la lógica de selección de servicios para reserva (`StepServices`, booking engine).
- Cambios en el Hero, Navbar, BookingSection, Footer o PreFooterBanner (salvo que se rompa un ancla).
- Rediseño de la identidad visual (paleta, tipografías).
- Mostrar precios/tiempos en cualquier otra parte de la landing.
