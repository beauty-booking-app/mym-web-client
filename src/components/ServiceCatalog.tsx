import { useEffect, useRef } from 'react'
import { useServices } from '@/hooks/useServices'

function formatPrice(n: number): string {
  return n.toLocaleString('es-AR')
}

export default function ServiceCatalog() {
  const { categories, loading } = useServices()
  const sectionRef = useRef<HTMLElement | null>(null)

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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
              Conocé todo lo que ofrecemos
            </h2>
          </div>
          <p className="reveal max-w-sm text-foreground/70 text-base" style={{ transitionDelay: '200ms' }}>
            Peluquería y belleza de uñas. Descubrí cada servicio con su precio y duración.
          </p>
        </div>

        {/* Grid de cards por categoría */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <article
              key={cat.id}
              className="reveal flex flex-col rounded-2xl border border-border bg-card p-6 sm:p-8 lift-card"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <h3
                className="font-display text-2xl sm:text-3xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {cat.label}
              </h3>

              <div className="h-px bg-border/60 my-5" />

              <ul className="space-y-6">
                {cat.services.flatMap((svc) =>
                  svc.types.map((type) => (
                    <li key={type.id} className="flex flex-col gap-1.5">
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="font-display text-lg leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
                          {type.name}
                        </p>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <span className="font-mono text-sm text-primary font-semibold">
                            ${formatPrice(type.price)}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-wide text-foreground/50">
                            {type.durationMinutes} min
                          </span>
                        </div>
                      </div>
                      {type.description && (
                        <p className="text-sm text-foreground/60 leading-relaxed">
                          {type.description}
                        </p>
                      )}
                    </li>
                  )),
                )}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}