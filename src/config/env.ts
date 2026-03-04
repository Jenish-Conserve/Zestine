export const env = {
    APP_TITLE: import.meta.env.VITE_APP_TITLE || 'Zestine App',
    API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
} as const;
