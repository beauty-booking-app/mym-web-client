import { useEffect, useRef } from 'react'
import { Scissors, Palette, Heart, type LucideIcon } from 'lucide-react'
import { useServices } from '@/hooks/useServices'

const CARDS: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Scissors,
    title: 'Peluquería',
    desc: 'Cortes, tratamientos y color para grandes y chicos. Asesoramiento experto y resultados impecables.',
  },
  {
    icon: Palette,
    title: 'Belleza de uñas',
    desc: 'Uñas semipermanentes, kapping y soft gel. Cuidado de detalle para tus manos.',
  },
  {
    icon: Heart,
    title: 'Atención premium',
    desc: 'Trato cálido y profesional. Cada visita es una experiencia pensada para vos.',
  },
]

export default function About() {
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
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                ; (entry.target as HTMLElement).style.transitionDelay = '0ms'
              })
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    const targets = node.querySelectorAll('.reveal')
    targets.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [loading])

  return (
    <section ref={sectionRef} id="servicios" style={{ backgroundColor: 'var(--background)' }}>
      {/* Sobre nosotros — solo las 3 tarjetas */}
      <div className="pt-0 pb-16 sm:pb-32 px-[6%] sm:px-[8%]">
        <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-6xl mx-auto -mt-12 sm:-mt-16">
          {CARDS.map((card, i) => (
            <div
              key={card.title}
              className="reveal lift-card relative z-70 flex flex-col items-center text-center gap-3 p-4 sm:p-6 rounded-2xl bg-primary/20"
              style={{
                backdropFilter: 'blur(4px)',
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full flex items-center justify-center mb-3 sm:mb-4" style={{ backgroundColor: 'var(--primary)' }}>
                <card.icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: 'var(--background)' }} strokeWidth={1.5} />
              </div>
              <h3
                className="font-display text-base sm:text-xl mb-2"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--foreground)',
                }}
              >
                {card.title}
              </h3>

              <p
                className="hidden sm:block text-xs sm:text-sm leading-relaxed"
                style={{ color: 'var(--foreground-muted)' }}
              >
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Nuestros servicios */}
      <div
        id="catalogo"
        className="py-20 sm:py-28 px-[6%] sm:px-[8%]"
        style={{ backgroundColor: 'var(--secondary)' }}
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
              <p
                className="reveal mt-6 max-w-2xl text-base sm:text-lg leading-relaxed"
                style={{ color: 'var(--foreground-muted)', transitionDelay: '200ms' }}
              >
                Peluquería y belleza de uñas. Elegí el servicio que mejor se adapta a vos.
              </p>
            </div>
          </div>

          {/* Grid de tarjetas por categoría */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-40 bg-foreground/10 rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {categories.map((cat, i) => (
                <article
                  key={cat.id}
                  className="reveal lift-card flex flex-col p-6 sm:p-8 rounded-2xl border border-border bg-card"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <h3
                    className="font-display text-2xl sm:text-3xl"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {cat.label}
                  </h3>

                  {cat.description && (
                    <p
                      className="text-sm leading-relaxed mt-1"
                      style={{ color: 'var(--primary)' }}
                    >
                      {cat.description}
                    </p>
                  )}

                  <div className="h-px bg-border/60 my-5" />

                  <ul className="space-y-2.5">
                    {cat.services.flatMap((svc) => svc.types).map((type) => (
                      <li
                        key={type.id}
                        className="flex items-center gap-3 text-sm sm:text-base"
                        style={{ color: 'var(--foreground-muted)' }}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: 'var(--primary)' }}
                        />
                        {type.name}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}