import React, { useState } from 'react'
import { Check } from 'lucide-react'
import { useServices } from '@/hooks/useServices'
import StepServices from '@/components/booking/StepServices'
import StepDateTime from '@/components/booking/StepDateTime'
import StepClient from '@/components/booking/StepClient'
import StepConfirm from '@/components/booking/StepConfirm'
import SlotUnavailableModal from '@/components/booking/SlotUnavailableModal'
import { createAppointment, validateSlot } from '@/services/api'
import { ApiError } from '@/types/api'
import type { Appointment, ClientData } from '@/types/models'

const STEPS = [
  { id: 1, label: 'Servicios' },
  { id: 2, label: 'Fecha y hora' },
  { id: 3, label: 'Tus datos' },
]

export default function BookingSection() {
  const { selectedTypes, toggleType, clearSelectedTypes } = useServices()
  const [step, setStep] = useState(1)
  const [date, setDate] = useState<string | null>(null)
  const [time, setTime] = useState<string | null>(null)
  const [client, setClient] = useState<ClientData>({ name: '', phone: '', email: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [appointment, setAppointment] = useState<Appointment | null>(null)
  const [slotUnavailable, setSlotUnavailable] = useState(false)

  const goNext = () => setStep((s) => Math.min(s + 1, 4))
  const goBack = () => {
    setSubmitError(null)
    setStep((s) => Math.max(s - 1, 1))
  }

  const handleConfirm = async (clientData: ClientData) => {
    if (submitting) return
    if (!date || !time) return
    setSubmitting(true)
    setSubmitError(null)
    try {
      await validateSlot(selectedTypes, date, time)
      const created = await createAppointment({
        serviceTypeIds: selectedTypes,
        date,
        startTime: time,
        clientName: clientData.name,
        clientPhone: clientData.phone,
        clientEmail: clientData.email,
      })
      setAppointment(created)
      setStep(4)
    } catch (err) {
      if (err instanceof ApiError && err.code === 'SlotUnavailable') {
        setSlotUnavailable(true)
      } else {
        setSubmitError(err instanceof Error ? err.message : 'No se pudo crear la cita. Intentá de nuevo.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  const handleReschedule = () => {
    setSlotUnavailable(false)
    setDate(null)
    setTime(null)
    setStep(1)
  }

  const handleGoHome = () => {
    setSlotUnavailable(false)
    setSubmitError(null)
    clearSelectedTypes()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section id="reserva" className="bg-background px-[6%] sm:px-[8%] py-20 sm:py-28">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-3">
            Reservá tu turno
          </p>
          <h2 className="font-display font-medium text-4xl sm:text-5xl leading-[1.05] text-balance">
            Agendá tu cita
          </h2>
          <p className="text-foreground/70 text-base mt-4">
            Elegí tus servicios, fecha y horario. Confirmás en menos de un minuto.
          </p>
        </div>

        {step <= 3 && (
          <nav aria-label="Pasos del reserva" className="flex items-center gap-2 mb-10">
            {STEPS.map((s, i) => (
              <React.Fragment key={s.id}>
                <div className="flex items-center gap-3">
                  <span
                    className={`font-mono text-[10px] h-7 w-7 flex items-center justify-center rounded-full border transition-colors ${step > s.id
                        ? 'border-accent bg-accent text-accent-foreground'
                        : step === s.id
                          ? 'border-primary text-primary bg-primary/5'
                          : 'border-border text-foreground/40'
                      }`}
                    aria-current={step === s.id ? 'step' : undefined}
                  >
                    {step > s.id ? <Check className="h-3.5 w-3.5" /> : String(s.id).padStart(2, '0')}
                  </span>

                  <span
                    className={`font-mono text-[10px] uppercase tracking-wide hidden sm:inline ${step === s.id ? 'text-foreground' : 'text-foreground/40'
                      }`}
                  >
                    {s.label}
                  </span>
                </div>

                {i < STEPS.length - 1 && (
                  <div className="flex-1 h-px bg-border mx-3" />
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {step === 1 && (
          <StepServices
            selected={selectedTypes}
            onToggle={toggleType}
            onNext={goNext}
          />
        )}

        {step === 2 && (
          <StepDateTime
            serviceTypeIds={selectedTypes}
            date={date}
            time={time}
            onDate={setDate}
            onTime={setTime}
            onNext={goNext}
            onBack={goBack}
          />
        )}

        {step === 3 && (
          <StepClient
            client={client}
            onChange={setClient}
            onNext={handleConfirm}
            onBack={goBack}
            submitting={submitting}
            error={submitError}
          />
        )}

        {step === 4 && (
          <StepConfirm
            services={selectedTypes}
            date={date ?? ''}
            time={time ?? ''}
            client={client}
            appointment={appointment}
            onGoHome={handleGoHome}
          />
        )}

        <SlotUnavailableModal
          open={slotUnavailable}
          onReschedule={handleReschedule}
          onCancel={handleGoHome}
        />
      </div>
    </section>
  )
}