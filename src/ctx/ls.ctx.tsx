import React, { createContext, FC } from 'react'

const LSCtx = createContext<{
  lsBrowserPath: string
  lsPassword?: string
  lsSkipTime: string
  lsStoreBrowserPath?: (val: string) => void
  lsStorePassword?: (val: string) => void
  lsStoreSkipTime?: (val: string) => void
}>({
  lsBrowserPath: '/',
  lsSkipTime: '5',
})

const LSProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const lsStoreBrowserPath = (val: string) => localStorage.setItem('vlc-browserPath', val)

  const lsStorePassword = (val: string) => localStorage.setItem('vlc-password', val)

  const lsStoreSkipTime = (val: string) => localStorage.setItem('vlc-skipTime', val)

  const value = {
    lsBrowserPath: localStorage.getItem('vlc-browserPath') || '/',
    lsPassword: localStorage.getItem('vlc-password') || undefined,
    lsSkipTime: localStorage.getItem('vlc-skipTime') || '5',
    lsStoreBrowserPath,
    lsStorePassword,
    lsStoreSkipTime,
  }

  return <LSCtx.Provider value={value}>{children}</LSCtx.Provider>
}

export { LSProvider }
export default LSCtx
