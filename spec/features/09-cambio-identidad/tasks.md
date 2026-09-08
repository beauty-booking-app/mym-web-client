# 09 · Cambio de identidad MyM — Tareas

_Checklist accionable derivada del `plan.md`. Marca `[x]` al completarlas._

## Identidad y marca

- [ ] Actualizar `index.html`: título "MyM", favicon/meta.
- [ ] Actualizar el nombre de marca (navbar, hero, footer) a **MyM**.
- [ ] Revisar textos y eliminar referencias a "barrio", "como en casa", "calidez de casa"; tono elegante y sobrio.

## Paleta y tipografía

- [ ] Actualizar tokens de color en `src/index.css` a la paleta negro + dorado (`#0f0f0f`, `#1a1a1a`, `#e2a872`, `#f4d3b4`, `#ffffff`, `#a0a0a0`, `#2a2a2a`).
- [ ] Cargar Google Fonts: **Playfair Display** (display) + **Plus Jakarta Sans** (body).
- [ ] Aplicar las tipografías en los tokens/estilos.
- [ ] Verificar que los colores van por tokens CSS, sin valores hardcodeados en componentes.

## Validación

- [ ] Identidad se ve correctamente en desktop y mobile.
- [ ] La funcionalidad actual (reserva, catálogo, mis turnos) sigue operativa.
- [ ] `pnpm lint` sin errores.
- [ ] `pnpm build` compila.
- [ ] Mover la feature a "Hecho" en `spec/constitution/roadmap.md` y actualizar `docs/CAMBIOS.md`.