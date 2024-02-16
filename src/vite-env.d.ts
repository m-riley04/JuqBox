/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_DATABASE_URL: string,
    readonly VITE_ADMIN_PASSWORD: string,
    readonly VITE_SPOTIFY_CLIENT_ID: string,
    readonly VITE_SPOTIFY_SECRET: string
    readonly VITE_DATABASE_HOST: string,
    readonly VITE_DATABASE_USERNAME: string,
    readonly VITE_DATABASE_PASSWORD: string,
    readonly VITE_AUTH0_DOMAIN: string,
    readonly VITE_AUTH0_CLIENT_ID: string,
    readonly VITE_AUTH0_SECRET: string,
    readonly VITE_AUTH0_AUDIENCE: string,
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}