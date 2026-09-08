export type ApiErrorCode =
  | 'NotFound'
  | 'ContactMismatch'
  | 'CannotCancel'
  | 'CannotReschedule'
  | 'SlotUnavailable'
  | 'ClientDataRequired'

export class ApiError extends Error {
  readonly code: ApiErrorCode
  readonly details?: unknown
  readonly status?: number

  constructor(
    code: ApiErrorCode,
    message?: string,
    options?: { details?: unknown; status?: number },
  ) {
    super(message || code)
    this.name = 'ApiError'
    this.code = code
    this.details = options?.details
    this.status = options?.status
  }
}

export interface ApiErrorBody {
  error?: string
  message?: string
  details?: unknown
}

// ─── Disponibilidad (app/schemas/availability.py) ─────────────────────────

export interface ServiceTypeDetail {
  id: string
  name: string
  durationMinutes: number
  price: number
}

export interface Slot {
  startTime: string
  endTime: string
  available: boolean
}

export interface SlotsResponse {
  serviceTypes: ServiceTypeDetail[]
  date: string
  durationMinutes: number
  price: number
  slots: Slot[]
}

export interface CalendarResponse {
  serviceTypes: ServiceTypeDetail[]
  month: string
  availableDates: string[]
}

export interface ValidateSlotResponse {
  available: boolean
  endTime: string | null
  price: number | null
}

// ─── Payloads de cita (app/schemas/appointments.py) ───────────────────────

export interface CreateAppointmentPayload {
  serviceTypeIds: string[]
  date: string
  startTime: string
  referenceComment?: string | null
  clientName: string
  clientPhone?: string
  clientEmail: string
}

export interface CancelAppointmentPayload {
  reason?: string | null
  email?: string | null
  phone?: string | null
}

export interface RescheduleAppointmentPayload {
  date: string
  startTime: string
  email?: string | null
  phone?: string | null
}