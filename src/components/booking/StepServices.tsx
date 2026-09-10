import { useState } from 'react'
import { ArrowLeft, Check, MoveRight } from 'lucide-react'
import { useServices } from '@/hooks/useServices'

function formatPrice(n: number): string {
  return n.toLocaleString('es-AR')
}

interface StepServicesProps {
  selected: string[]
  onToggle: (typeId: string) => void
  onNext: () => void
}

export default function StepServices({ selected, onToggle, onNext }: StepServicesProps) {
  const { categories, loading } = useServices()
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null)

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <p className="text-foreground/50 text-center font-mono text-xs uppercase tracking-wide py-20">Cargando servicios...</p>
      </div>
    )
  }

  const activeCategory = categories.find((cat) => cat.id === activeCategoryId) ?? null

  return (
    <div className="max-w-4xl mx-auto flex flex-col min-h-[30rem] sm:min-h-[32rem]">
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-2">
        Paso 01
      </p>
      <h2 className="font-display text-3xl sm:text-4xl mb-2">
        {activeCategory ? activeCategory.label : 'Elegí tus servicios'}
      </h2>
      <p className="text-foreground/70 text-sm mb-10">
        {activeCategory
          ? 'Podés combinar varios servicios. Elegí los que quieras.'
          : 'Elegí una categoría para ver sus servicios.'}
      </p>

      <div key={activeCategory ? activeCategory.id : 'categories'} className="step-enter flex-1">
      {!activeCategory ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              className="group text-left p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all lift-card cursor-pointer"
              aria-label={`Ver servicios de ${cat.label}`}
            >
              <span className="font-display text-xl leading-tight block">{cat.label}</span>
              <span className="font-mono text-[10px] uppercase tracking-wide text-foreground/50 mt-2 block">
                Ver servicios →
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-10">
          <button
            onClick={() => setActiveCategoryId(null)}
            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wide text-foreground/60 hover:text-foreground transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Todas las categorías
          </button>

          {activeCategory.services.map((svc) => (
            <div key={svc.id} className="mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {svc.types.map((type) => {
                  const isSelected = selected.includes(type.id)
                  return (
                    <button
                      key={type.id}
                      onClick={() => onToggle(type.id)}
                      className={`group text-left p-5 rounded-2xl border transition-all min-h-11 lift-card cursor-pointer ${isSelected
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-card hover:border-primary/50'
                        }`}
                      aria-label={`${isSelected ? 'Quitar' : 'Seleccionar'} ${type.name}`}
                      aria-pressed={isSelected}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-display text-lg leading-tight">{type.name}</p>
                          <p className="text-xs text-foreground/50 font-mono mt-1">
                            ${formatPrice(type.price)} · {type.durationMinutes} min
                          </p>
                        </div>
                        <span
                          className={`h-5 w-5 shrink-0 rounded-full border flex items-center justify-center transition-colors ${isSelected ? 'border-accent bg-accent' : 'border-border'
                            }`}
                        >
                          {isSelected && <Check className="h-3 w-3 text-accent-foreground" />}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
      </div>

      <div className="flex items-center justify-between pt-8 mt-6">
        <span className="font-mono text-[10px] uppercase tracking-wide text-foreground/60">
          {selected.length} servicio{selected.length !== 1 ? 's' : ''} seleccionado{selected.length !== 1 ? 's' : ''}
        </span>

        <button
          onClick={onNext}
          disabled={selected.length === 0}
          className="font-mono text-[10px] sm:text-xs uppercase tracking-wide font-semibold px-8 py-3.5 rounded-full bg-primary text-background hover:bg-primary/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-2 cursor-pointer"
        >
          Siguiente
          <MoveRight className="h-4 w-4 animate-bounce" style={{ animationDuration: '2.5s' }} />
        </button>
      </div>
    </div>
  )
}