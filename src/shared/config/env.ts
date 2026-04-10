export const APP_CONFIG = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '',
  useMswInBrowser: import.meta.env.DEV && import.meta.env.VITE_ENABLE_MSW === 'true',
} as const;
