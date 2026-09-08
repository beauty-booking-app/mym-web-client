// Modelos de dominio compartidos. Shapes alineados con el backend
// (`mym-api-backend/app/schemas/`), que expone camelCase en el JSON.

export type AppointmentStatus =
  | 'pendiente'
  | 'confirmado'
  | 'reprogramado'
  | 'completado'
  | 'cancelado'
  | 'no_asiste'

export interface ReferenceImage {
  url?: string
}

export interface ServiceType {
  id: string
  name: string
  durationMinutes: number
  price: number
  description?: string | null
  referenceImage?: ReferenceImage | null
}

export interface Service {
  id: string
  name: string
  description?: string | null
  referenceImage?: ReferenceImage | null
  cancelable?: boolean
  cancellationPeriodHours?: number
  category?: string
  pillar?: string
  types: ServiceType[]
}

export interface Category {
  id: string
  label: string
  pillar: string
  description?: string | null
  image: string | null
  services: Service[]
}

export interface ServiceTypeWithDetails extends ServiceType {
  serviceId: string
  serviceName: string
  category: string
  cancelable?: boolean
  cancellationPeriodHours?: number
}

export interface ClientData {
  name: string
  phone: string
  email: string
}

export interface AppointmentServiceType {
  id: string
  name: string
  durationMinutes?: number
  price: number
}

export interface AppointmentClient {
  id?: string
  name: string
}

export interface Appointment {
  id: string
  humanId: string
  serviceTypeIds?: string[]
  date?: string
  serviceTypes: AppointmentServiceType[]
  client?: AppointmentClient | null
  startTime: string
  endTime?: string | null
  durationMinutes: number
  price: number
  referenceImage?: ReferenceImage | null
  referenceComment?: string | null
  status: AppointmentStatus
  statusDetail?: string | null
}