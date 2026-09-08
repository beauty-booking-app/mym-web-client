import { useContext } from 'react'
import { ServicesContext } from '@/context/servicesContext'
import type { ServicesContextValue } from '@/types/context'

export function useServices(): ServicesContextValue {
  const ctx = useContext(ServicesContext)
  if (!ctx) throw new Error('useServices debe usarse dentro de ServicesProvider')
  return ctx
}