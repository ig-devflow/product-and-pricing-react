export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL?.trim() ?? '',
} as const;

export const APP_CONFIG = {
  ...env,
  useMswInBrowser:
    import.meta.env.DEV && import.meta.env.VITE_ENABLE_MSW === 'true',
} as const;
