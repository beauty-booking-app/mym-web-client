import type { Category, Service, ServiceTypeWithDetails } from './models'

export interface ServicesContextValue {
  services: Service[]
  categories: Category[]
  allTypes: ServiceTypeWithDetails[]
  selectedTypes: string[]
  toggleType: (typeId: string) => void
  clearSelectedTypes: () => void
  loading: boolean
  error: unknown
}