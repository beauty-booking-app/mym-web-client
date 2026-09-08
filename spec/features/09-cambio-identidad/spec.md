# 09 · Cambio de identidad MyM

**Estado:** propuesta (pendiente de aprobación)

## Contexto

El frontend actual (vista "Tammi") transmite un salón de barrio cálido (terracota + crema, "como en casa"). El negocio pasa a llamarse **MyM** y quiere posicionarse como un **salón deluxe/premium**. Esta feature cubre únicamente la **identidad visual y de marca**, sin tocar la estructura de páginas ni el consumo de la API.

La estética de referencia es la de los HTML mockups en `spec/diseño base/` (`hairaura_home`, `hairaura_booking`, `hairaura_onboarding`): fondo negro, dorado miel como acento, serif elegante para títulos.

## Qué hace

1. **Nuevo nombre de marca:** **MyM** (navbar, hero, footer, título del documento, favicon/meta).
2. **Textos a tono premium/sobrio:** eliminar "barrio", "como en casa", "calidez de casa".
3. **Paleta negro + dorado:** actualizar tokens en `src/index.css` (ver abajo) para toda la app.
4. **Tipografías premium:** Playfair Display (títulos) + Plus Jakarta Sans (cuerpo), desde Google Fonts.

## Por qué

- El cliente cambia el posicionamiento del negocio a deluxe/premium.
- Una identidad visual coherente (paleta, tipografía, nombre) es lo que transmite el nivel del salón.

## Criterios de aceptación

### Identidad y marca
- [ ] El nombre del salón es **MyM** (navbar, hero, footer, título del documento, favicon/meta).
- [ ] Los textos eliminan referencias a "barrio", "como en casa" y "calidez de casa"; son elegantes y sobrios.

### Paleta y tipografía
- [ ] Los tokens de color en `src/index.css` usan la paleta negro + dorado:
      fondo `#0f0f0f`, cards `#1a1a1a`, acento dorado `#e2a872` (light `#f4d3b4`), texto `#ffffff` / `#a0a0a0`, borde `#2a2a2a`.
- [ ] Tipografías cargadas: **Playfair Display** (display) y **Plus Jakarta Sans** (body), desde Google Fonts.
- [ ] Se respeta el límite de `tech-stack.md`: los colores van por tokens CSS, sin valores hardcodeados en componentes.

### Responsive / compatibilidad
- [ ] El cambio de identidad se ve correctamente tanto en desktop como en mobile.
- [ ] La funcionalidad actual (reserva, catálogo, mis turnos) sigue operativa tras el cambio de identidad.

## Fuera de alcance

- Rediseño de la estructura de la landing (scroll único, secciones) → feature **10**.
- Migración JS/JSX → TS/TSX → feature **11**.
- Modificaciones al backend (`api/`) o al panel admin (`admin/`).
- Nuevas funcionalidades de reserva o cambios en el contrato de datos con la API.

## Referencia

Los mockups de estilo están en `spec/diseño base/hairaura_home.html`, `hairaura_booking.html` y `hairaura_onboarding.html`. No son estructuras a copiar literalmente: son referencia de paleta, tipografía y look de app móvil.