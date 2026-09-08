import { createContext } from 'react'
import type { ServicesContextValue } from '@/types/context'

export const ServicesContext = createContext<ServicesContextValue | null>(null)