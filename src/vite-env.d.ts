/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_DATABASE_URL: string,
    readonly VITE_ADMIN_PASSWORD: string,
    readonly VITE_SPOTIFY_CLIENT_ID: string,
    readonly VITE_SPOTIFY_SECRET: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}