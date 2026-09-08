import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useServices } from '../hooks/useServices'
import { Plus, Check, MoveRight } from "lucide-react";

function formatPrice(n) {
  return n.toLocaleString('es-AR')
}

export default function ServiceCatalog() {
  const { categories, loading, selectedTypes, toggleType } = useServices()
  const sectionRef = useRef(null)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.05 },
    )

    const targets = node.querySelectorAll('.reveal')
    targets.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [loading])

  if (loading) {
    return (
      <section id="catalogo" className="py-20 sm:py-28 px-[6%] sm:px-[8%]">
        <div className="h-3 w-40 bg-foreground/10 rounded mb-4" />
        <div className="h-10 w-96 max-w-full bg-foreground/10 rounded mb-12" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-72 bg-foreground/10 rounded-2xl" />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      id="catalogo"
      className="py-20 sm:py-28 px-[6%] sm:px-[8%]"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div>
            <p
              className="reveal font-mono text-xs uppercase tracking-[0.25em] text-primary mb-3"
              style={{ transitionDelay: '0ms' }}
            >
              Nuestros servicios
            </p>
            <h2
              className="reveal font-display font-medium text-4xl sm:text-5xl leading-[1.05] text-balance max-w-2xl"
              style={{ fontFamily: 'var(--font-display)', transitionDelay: '100ms' }}
            >
              Elegí tus servicios y reservá en un click
            </h2>
          </div>
          <p className="reveal max-w-sm text-foreground/70 text-base" style={{ transitionDelay: '200ms' }}>
            Cuatro rubros premium. Seleccioná uno o combiná varios; el turno se arma con lo que elegís.
          </p>
        </div>

        {/* Grid de tarjetas por categoría */}
        <div className="space-y-16">
          {categories.map((cat) => (
            <div key={cat.id} className="reveal">
              <div className="flex items-baseline justify-between flex-wrap gap-2 mb-8">
                <h3
                  className="font-display text-2xl sm:text-3xl"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {cat.label}
                </h3>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                  {cat.pillar}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cat.services.flatMap((svc) =>
                  svc.types.map((type) => {
                    const isSelected = selectedTypes.includes(type.id)
                    return (
                      <button
                        key={type.id}
                        onClick={() => toggleType(type.id)}
                        aria-label={`${isSelected ? 'Quitar' : 'Seleccionar'} ${type.name}`}
                        aria-pressed={isSelected}
                        className={`group flex flex-col text-left p-6 rounded-2xl border transition-all duration-300 lift-card cursor-pointer min-h-44 ${
                          isSelected
                            ? 'border-primary bg-secondary/80'
                            : 'border-border bg-card hover:border-primary/60 hover:bg-secondary/40'
                        }`}
                        style={{
                          backgroundColor: isSelected ? 'var(--secondary)' : 'var(--background)',
                        }}
                      >
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/40">
                            {svc.name}
                          </span>
                          <span
                            className={`h-8 w-8 shrink-0 rounded-full border flex items-center justify-center transition-colors ${
                              isSelected ? 'border-primary bg-primary' : 'border-border group-hover:border-primary'
                            }`}
                          >
                            {isSelected ? (
                              <Check className="h-4 w-4 text-background" strokeWidth={2.5} />
                            ) : (
                              <Plus className="h-4 w-4 text-primary" strokeWidth={2} />
                            )}
                          </span>
                        </div>

                        <p className="font-display text-xl mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                          {type.name}
                        </p>
                        <p className="text-sm text-foreground/60 leading-relaxed mb-4 line-clamp-3">
                          {type.description}
                        </p>

                        <div className="mt-auto flex items-center justify-between gap-4 pt-3 border-t border-border/60">
                          <span className="font-mono text-sm text-primary font-semibold">
                            ${formatPrice(type.price)}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-wide text-foreground/50">
                            {type.durationMinutes} min
                          </span>
                        </div>
                      </button>
                    )
                  }),
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer de selección */}
        <div className="mt-16 reveal flex items-center justify-between gap-4 flex-wrap p-6 rounded-2xl border border-border bg-secondary">
          <p className="font-mono text-xs font-semibold uppercase tracking-wide text-foreground/90 px-2">
            {selectedTypes.length} servicio{selectedTypes.length !== 1 ? 's' : ''} seleccionado{selectedTypes.length !== 1 ? 's' : ''}
          </p>
          <Link
            to="/#reserva"
            className={`inline-flex items-center justify-center px-8 py-4 text-sm font-semibold rounded-full min-h-11 min-w-11 transition-all cursor-pointer ${
              selectedTypes.length === 0 ? 'opacity-50 pointer-events-none' : ''
            }`}
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--background)',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = 'var(--primary-light)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = 'var(--primary)')
            }
            aria-disabled={selectedTypes.length === 0}
          >
            <span className='flex gap-2 items-center'>
              Reservar turno
              <MoveRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}