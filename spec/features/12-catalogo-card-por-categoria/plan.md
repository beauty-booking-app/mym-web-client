# 12 · Catálogo: cards por categoría — Plan

## Arquitectura

Solo se modifica `src/components/ServiceCatalog.tsx`. Se mantiene el mismo flujo de datos (`useServices()`) y el mismo patrón de animación de scroll.

### Estructura del render

```
┌────────────────────────────────────────────┐
│  Volanta + Título                          │  ← se conserva (header de sección)
│                                            │
│  ┌────────────────┐  ┌────────────────┐    │  ← grid sm:grid-cols-2
│  │ Card Categoría  │  │ Card Categoría  │   │
│  │  Label          │  │  Label          │   │
│  │  ─────────────  │  │  ─────────────  │   │
│  │  · tipo 1       │  │  · tipo 3       │   │
│  │  · tipo 2       │  │  · tipo 4       │   │
│  └────────────────┘  └────────────────┘    │
└────────────────────────────────────────────┘
```

### Card de categoría

```
<div class="reveal rounded-2xl border border-border bg-card p-6 flex flex-col lift-card"
     style="transitionDelay: {i * 100}ms">
  <h3 class="font-display ...">{cat.label}</h3>      ← header
  <hr class="border-border/60 my-5" />               ← línea divisoria
  <ul class="space-y-5">
    <li> nombre + descripción | precio · duración </li>
    ...
  </ul>
</div>
```

### Fila de servicio

Cada `ServiceType` aplanado (`cat.services.flatMap(svc => svc.types)`) queda como fila:
- Nombre del tipo (font-display, sm).
- Descripción en `text-foreground/60`.
- Al final de la fila: precio `text-primary` y duración `text-foreground/50` (`mt-auto`).
- Separadas por `space-y-5` (o divider sutil por fila).

### Responsive

- Grid: `grid grid-cols-1 sm:grid-cols-2 gap-6`.
- Mobile (base): 1 columna. Desde `sm`: 2 columnas.
- La card usa `min-h` para que las filas queden alineadas entre columnas (`flex flex-col`).

### Animación de entrada

- Cada card lleva `.reveal` con `transitionDelay` escalonado (`i * 100ms`).
- El `IntersectionObserver` existente del componente (que agrega `.revealed`) se conserva, adaptando los targets a las cards.

### Accesibilidad

- Header de card con `h3` (h1 → h2 de sección → h3 de categoría).
- Lista con `<ul>/<li>` semánticos.
- `prefers-reduced-motion`: cubierto por el CSS existente.

## Pasos

1. Reescribir el mapa de categorías en `ServiceCatalog.tsx` de grid-4-cols + h3 por categoría → grid `grid-cols-1 sm:grid-cols-2` de cards por categoría.
2. Aplanar `types` y renderizar lista dentro de cada card.
3. Ajustar el `IntersectionObserver` para observar las nuevas cards (`.reveal`) y mantener el stagger.
4. Validar `pnpm build`, `pnpm lint`, `pnpm typecheck`.
5. Actualizar `docs/CAMBIOS.md`.