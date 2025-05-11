export interface LSContext {
  lsBrowserPath: string
  lsPassword?: string
  lsSkipTime: string
  lsStoreBrowserPath: (val: string) => void
  lsStorePassword: (val: string) => void
  lsStoreSkipTime: (val: string) => void
}
