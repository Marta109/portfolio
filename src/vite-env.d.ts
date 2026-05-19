/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DID_API_KEY?: string
  /** Optional override for D-ID API origin (e.g. same-origin proxy in production). */
  readonly VITE_DID_API_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.md?raw' {
  const content: string
  export default content
}
