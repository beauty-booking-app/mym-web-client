import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 inset-x-0 z-99"
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="flex items-center justify-between gap-4 px-[6%] sm:px-[8%] h-16 sm:h-20">
        <Link
          to="/"
          className="font-display text-2xl sm:text-3xl font-medium tracking-wide cursor-pointer"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          MyM
        </Link>
        <div className="flex items-center gap-4">
          <Link
            to="/mis-turnos"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 text-sm font-semibold rounded-full min-h-11 min-w-11 cursor-pointer"
            style={{
              color: 'var(--foreground)',
              border: '2px solid var(--border)',
              backgroundColor: 'transparent',
              backdropFilter: 'blur(4px)',
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
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 text-sm font-bold rounded-full min-h-11 min-w-11 cursor-pointer"
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
            RESERVAR
          </Link>
        </div>
      </div>
    </nav>
  )
}