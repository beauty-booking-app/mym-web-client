# 13 · Fusionar "Sobre nosotros" con el catálogo de servicios — Plan

_Cómo se implementa lo descrito en `spec.md`. Respeta la `constitution/`._

## Enfoque

Convertir `About.tsx` en la sección fusionada: se conserva el bloque institucional actual y se le añade, debajo, el bloque de servicios que hoy vive en `ServiceCatalog.tsx`. Como ambos bloques pertenecen a la misma sección, se unifica en un solo `<section id="servicios">` con un sub-bloque interno `id="catalogo"` que actúa como ancla del CTA "Conocé nuestros servicios". No se toca el contrato de datos: las descripciones por categoría ya vienen en `Category.description`.

## Implementación

1. `src/components/About.tsx`
   - Importar `useServices` y los iconos que hagan falta (si se usan).
   - Mantener el header, el párrafo y las 3 tarjetas sin cambios de contenido.
   - Añadir debajo un bloque de servicios:
     - `id="catalogo"` en el contenedor del bloque.
     - Encabezado: eyebrow "Nuestros servicios" + título "Conocé todo lo que ofrecemos" (se reutiliza el copy actual del catálogo).
     - Si `loading`: grilla skeleton de 4 tarjetas.
     - Si no: `categories.map(...)` → tarjeta con `cat.label` (font-display) y `cat.description` (texto muted). **Sin precio ni duración.**
     - Grid `grid-cols-1 sm:grid-cols-2 gap-6` con `.reveal` y `transitionDelay` escalonado.
   - Reutilizar el `IntersectionObserver` existente; asegurar que observe también los nuevos `.reveal` (el observer corre una vez; como las tarjetas se montan al terminar el `loading`, se debe re-ejecutar/re-observar cuando cambian los datos → usar `loading` en las deps del `useEffect`, igual que hacía `ServiceCatalog`).
2. `src/pages/LandingPage.tsx`
   - Eliminar el import de `ServiceCatalog` y su `<ServiceCatalog />`.
3. Eliminar `src/components/ServiceCatalog.tsx`.
4. Verificar anclas: `Hero.tsx` (`#catalogo`), `Footer.tsx` (`#catalogo`) y cualquier `#servicios`.
5. Documentar en `docs/CAMBIOS.md`.
6. Actualizar `spec/constitution/roadmap.md`.

## Decisiones

- **Extender `About.tsx` en vez de crear un componente nuevo** — la sección es una sola y `About` ya contiene el bloque "Sobre nosotros"; evita un wrapper extra y mantiene el `IntersectionObserver` en un único lugar. Alternativa descartada: crear `AboutServices.tsx` y eliminar ambos originales (más churn innecesario).
- **Bloque de servicios como sub-sección (`id="catalogo"`) dentro de la sección (`id="servicios"`)** — conserva las dos anclas existentes sin tocar Hero ni Footer.
- **Descripción a nivel categoría (`Category.description`)** — es el texto real disponible en el backend y es el que el cliente pidió mostrar. Alternativa descartada: descripción por `ServiceType`, que hoy viene `null` en el backend.
- **Sin precios ni duración en la landing** — pedido explícito. Los precios siguen disponibles en el flujo de reserva (`StepServices`), que no se modifica.
- **Tarjetas de categoría sin imagen** — se mantiene el foco en la descripción, alineado con el estilo del About y con la guía de diseño (restricción/restraint). La imagen `Category.image` queda disponible para una iteración futura.

## Riesgos

- **El observer no captura las tarjetas que llegan después del fetch** — mitigación: incluir `loading` en las dependencias del `useEffect` del observer para re-observar al montar las cards.
- **`Category.description` puede venir `null`** — mitigación: renderizar la descripción solo si existe (misma guarda `{type.description && ...}` que usa el catálogo actual).
- **Romper el scroll de los CTA existentes** — mitigación: conservar `id="servicios"` y `id="catalogo"` y validar los links del Hero y Footer.
