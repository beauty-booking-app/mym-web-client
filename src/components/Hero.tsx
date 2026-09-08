import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import heroImg from '@/assets/hero.webp'
import { ArrowDown } from 'lucide-react'

export default function Hero() {
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
      { threshold: 0.15 },
    )

    const targets = node.querySelectorAll('.reveal')
    targets.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-svh flex items-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right',
        }}
      />
      {/* Gradient overlay — left to right */}
      <div
        className="absolute inset-0 z-11"
        style={{
          background:
            'linear-gradient(to right, rgba(15,15,15,0.95) 45%, rgba(15,15,15,0.6) 100%)',
        }}
      />

      {/* Content grid */}
      <div className="relative z-50 w-full px-[6%] sm:px-[8%] py-20 grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 items-center min-h-svh">
        {/* Text column */}
        <div className="flex flex-col gap-6 max-w-xl">
          <p
            className="reveal font-mono text-xs uppercase tracking-[0.25em] text-primary mb-6"
            style={{
              color: 'var(--primary)',
            }}
          >
            Tu salón premium · Peluquería y manicura
          </p>

          <h1
            className="reveal font-display font-medium text-foreground text-balance leading-tight"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.75rem, 7vw, 6rem)',
            }}
          >
            Elegí estar bien.
            <br />
            <span className="text-primary">Belleza que se nota.</span>
          </h1>

          <p
            className="reveal mt-8 max-w-xl text-lg sm:text-xl text-foreground/80"
            style={{
              color: 'var(--foreground-muted)',
            }}
          >
            Un espacio pensado para tu cuidado: cortes, tratamientos, color y
            uñas con excelencia y atención personalizada.
          </p>

          <div
            className="reveal flex flex-wrap gap-4 mt-2"
            style={{ transitionDelay: '300ms' }}
          >
            <Link
              to="/#reserva"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold rounded-full min-h-11 min-w-11"
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
            >
              Reservá tu turno
            </Link>

            <a
              href="#catalogo"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold rounded-full min-h-11 min-w-11"
              style={{
                color: 'var(--foreground)',
                border: '2px solid var(--border)',
                backgroundColor: 'transparent',
                backdropFilter: 'blur(4px)',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = 'var(--primary)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = 'var(--border)')
              }
            >
              Conocé nuestros servicios
            </a>
          </div>
        </div>
        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/60">Descubrí más</span>
          <ArrowDown className="h-4 w-4 text-primary animate-bounce" style={{ animationDuration: '2.5s' }} />
        </div>
        {/* Right column — empty, lets the background show through */}
        <div className="hidden lg:block" aria-hidden="true" />
      </div>
    </section>
  )
}