// Конфигурация приложения
export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  appName: 'Admisstion triper',
} as const;
