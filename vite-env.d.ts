/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BASE_URL: string
    readonly VITE_TASK_API_BASE_URL: string
    readonly VITE_USER_API_BASE_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
