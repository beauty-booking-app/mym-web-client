// Configuración de la app.
// No se usan variables de entorno con prefijo público (VITE_*) para exponer
// configuración por nombre. La URL del backend se resuelve en build:
// en desarrollo apunta al backend local y en producción al productivo.
export const Config = {
  apiUrl: import.meta.env.DEV
    ? 'http://localhost:8000'
    : 'https://mym-api-backend.vercel.app',
} as const
