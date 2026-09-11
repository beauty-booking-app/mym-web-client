import { Link } from 'react-router-dom'
import logo from '@/assets/logo-blanco.png'

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 inset-x-0 z-99"
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="flex items-center justify-between gap-4 px-[6%] sm:px-[8%] h-16 sm:h-20">
        <Link to="/" aria-label="MyM — Inicio" className="cursor-pointer">
          <img src={logo} alt="MyM" className="h-9 sm:h-12 w-auto" />
        </Link>
        <div className="flex items-center gap-4">
          <Link
            to="/mis-turnos"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 text-xs font-semibold uppercase tracking-[0.1em] rounded-full min-h-11 min-w-11 cursor-pointer"
            style={{
              color: 'var(--foreground)',
              border: '2px solid var(--border)',
              backgroundColor: 'transparent',
              backdropFilter: 'var(--glass-blur)',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = 'var(--primary)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = 'var(--border)')
            }
          >
            MIS TURNOS
          </Link>
          <Link
            to="/#reserva"
            className="hidden sm:inline-flex items-center justify-center px-6 sm:px-8 py-3 text-xs font-bold uppercase tracking-[0.1em] rounded-full min-h-11 min-w-11 cursor-pointer"
            style={{
              backgroundImage: 'var(--gradient-gold-metallic)',
              color: 'var(--background)',
              transition: 'filter 0.2s',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.filter = 'brightness(1.1)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.filter = 'none')
            }
          >
            RESERVAR
          </Link>
        </div>
      </div>
    </nav>
  )
}