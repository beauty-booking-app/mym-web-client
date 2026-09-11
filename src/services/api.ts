import { getClientToken } from '@/lib/clientToken'
import { Config } from '@/lib/config'
import type { Appointment, Service } from '@/types/models'
import {
  ApiError,
  type ApiErrorBody,
  type CalendarResponse,
  type CancelAppointmentPayload,
  type CreateAppointmentPayload,
  type RescheduleAppointmentPayload,
  type SlotsResponse,
  type ValidateSlotResponse,
} from '@/types/api'

const BASE_URL = Config.apiUrl

// Lee el cuerpo de error que devuelve el backend (puede no ser JSON válido).
async function readErrorBody(res: Response): Promise<ApiErrorBody | null> {
  try {
    return (await res.json()) as ApiErrorBody
  } catch {
    return null
  }
}

export async function fetchServices(): Promise<Service[]> {
  const res = await fetch(`${BASE_URL}/api/v1/public/services`)
  if (!res.ok) throw new Error('Error al cargar servicios')
  return res.json()
}

export async function fetchAvailableDates(
  serviceTypeIds: string[],
  month: string,
): Promise<CalendarResponse> {
  const params = new URLSearchParams({ month })
  serviceTypeIds.forEach((id) => params.append('serviceTypeIds', id))
  const res = await fetch(`${BASE_URL}/api/v1/availability/calendar?${params}`)
  if (!res.ok) throw new Error('Error al cargar disponibilidad')
  return res.json()
}

export async function fetchSlots(
  serviceTypeIds: string[],
  date: string,
): Promise<SlotsResponse> {
  const params = new URLSearchParams({ date })
  serviceTypeIds.forEach((id) => params.append('serviceTypeIds', id))
  const res = await fetch(`${BASE_URL}/api/v1/availability/slots?${params}`)
  if (!res.ok) throw new Error('Error al cargar horarios')
  return res.json()
}

// ─── GET /availability/validate ─────────────────────────────────────
// Valida que un horario siga disponible antes de confirmar la reserva.
export async function validateSlot(
  serviceTypeIds: string[],
  date: string,
  startTime: string,
): Promise<ValidateSlotResponse> {
  const params = new URLSearchParams({ date, startTime })
  serviceTypeIds.forEach((id) => params.append('serviceTypeIds', id))
  const res = await fetch(`${BASE_URL}/api/v1/availability/validate?${params}`)
  if (!res.ok) {
    const err = await readErrorBody(res)
    if (res.status === 409 && err?.error === 'SlotUnavailable') {
      throw new ApiError('SlotUnavailable')
    }
    throw new Error(err?.message || 'Error al validar disponibilidad')
  }
  return res.json()
}

// ─── POST /appointments ────────────────────────────────────────────
// Crea una cita anónima. Devuelve el Appointment creado.
export async function createAppointment({
  serviceTypeIds,
  date,
  startTime,
  referenceComment,
  clientName,
  clientPhone,
  clientEmail,
}: CreateAppointmentPayload): Promise<Appointment> {
  const clientToken = await getClientToken()
  const res = await fetch(`${BASE_URL}/api/v1/appointments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Client-Token': clientToken,
    },
    body: JSON.stringify({
      serviceTypeIds,
      date,
      startTime,
      referenceComment: referenceComment || null,
      clientName,
      clientPhone,
      clientEmail,
    }),
  })
  if (!res.ok) {
    const err = await readErrorBody(res)
    const message = mapCreateError(res.status, err)
    throw new Error(message)
  }
  return res.json()
}

// Traduce los errores del backend a mensajes claros para el usuario.
function mapCreateError(status: number, err: ApiErrorBody | null): string {
  if (status === 401) {
    return 'Tu sesión venció. Recargá la página y volvé a intentar.'
  }
  if (status === 400 && err?.error === 'ClientDataRequired') {
    return 'Completá tu nombre y email para reservar.'
  }
  if (status === 409 && err?.error === 'SlotUnavailable') {
    return 'Ese horario ya no está disponible. Elegí otro.'
  }
  return err?.message || 'No se pudo crear la cita. Intentá de nuevo.'
}

// ─── GET /public/appointments/by-human-id/{humanId} ────────────────
// Consulta pública de turno por código. No requiere autenticación.
export async function fetchAppointmentByHumanId(humanId: string): Promise<Appointment> {
  const res = await fetch(`${BASE_URL}/api/v1/public/appointments/by-human-id/${humanId}`)
  if (!res.ok) {
    if (res.status === 404) {
      throw new ApiError('NotFound')
    }
    throw new Error('Error al buscar el turno')
  }
  return res.json()
}

// ─── PATCH /public/appointments/by-human-id/{humanId}/cancel ───────
// Cancela un turno por código. Requiere email o phone del dueño.
export async function cancelAppointmentByHumanId(
  humanId: string,
  payload: CancelAppointmentPayload,
): Promise<Appointment> {
  const res = await fetch(`${BASE_URL}/api/v1/public/appointments/by-human-id/${humanId}/cancel`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      reason: payload.reason,
      email: payload.email || null,
      phone: payload.phone || null,
    }),
  })
  if (!res.ok) {
    const err = await readErrorBody(res)
    if (res.status === 403) {
      throw new ApiError('ContactMismatch', undefined, { details: err?.details, status: 403 })
    }
    if (res.status === 409 && err?.error === 'CannotCancel') {
      throw new ApiError('CannotCancel', undefined, { details: err?.details, status: 409 })
    }
    throw new Error(err?.message || 'No se pudo cancelar el turno')
  }
  return res.json()
}

// ─── POST /public/appointments/by-human-id/{humanId}/reschedule ────
// Reprograma un turno por código. Requiere email o phone del dueño.
export async function rescheduleAppointmentByHumanId(
  humanId: string,
  payload: RescheduleAppointmentPayload,
): Promise<Appointment> {
  const res = await fetch(
    `${BASE_URL}/api/v1/public/appointments/by-human-id/${humanId}/reschedule`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: payload.date,
        startTime: payload.startTime,
        email: payload.email || null,
        phone: payload.phone || null,
      }),
    },
  )
  if (!res.ok) {
    const err = await readErrorBody(res)
    if (res.status === 403) {
      throw new ApiError('ContactMismatch', undefined, { details: err?.details, status: 403 })
    }
    if (res.status === 409 && err?.error === 'SlotUnavailable') {
      throw new ApiError('SlotUnavailable', undefined, { status: 409 })
    }
    if (res.status === 409 && err?.error === 'CannotReschedule') {
      throw new ApiError('CannotReschedule', undefined, { details: err?.details, status: 409 })
    }
    throw new Error(err?.message || 'No se pudo reprogramar el turno')
  }
  return res.json()
}