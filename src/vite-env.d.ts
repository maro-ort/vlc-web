interface ImportMetaEnv extends import('vite/client').ImportMetaEnv {
  VITE_VLC_HOST: string
  VITE_VLC_PASSWORD: string
}

interface ImportMeta extends import('vite/client').ImportMeta {
  readonly env: ImportMetaEnv
}
