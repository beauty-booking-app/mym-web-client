import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";

export default function PreFooterBanner() {
  return (
    <section
      className="px-[6%] sm:px-[8%] py-20 sm:py-28"
      style={{ backgroundColor: 'var(--secondary)' }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-4">Te esperamos</p>
          <h2 className="font-display font-medium text-4xl sm:text-5xl leading-[1.05] text-balance">
            Reservá tu turno y viví la experiencia MyM.
          </h2>
        </div>
        <div className="lg:col-span-4 lg:text-right">
          <Link
            to="/#reserva"
            aria-label="Reservar un turno en MyM Salón de belleza"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-sm font-semibold transition-colors"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--background)',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = 'var(--primary-light)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = 'var(--primary)')
            }
          >
            Reservar turno
            <MoveRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}