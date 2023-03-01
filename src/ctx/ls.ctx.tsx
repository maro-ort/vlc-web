import React, { createContext, FC } from 'react'

const LSCtx = createContext<{
  lsBrowserPath: string
  lsSkipTime: string
  lsStoreBrowserPath?: (val: string) => void
  lsStoreSkipTime?: (val: string) => void
}>({
  lsBrowserPath: '/',
  lsSkipTime: '5',
})

const LSProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const lsStoreBrowserPath = (val: string) => localStorage.setItem('vlc-browserPath', val)

  const lsStoreSkipTime = (val: string) => localStorage.setItem('vlc-skipTime', val)

  const value = {
    lsBrowserPath: localStorage.getItem('vlc-browserPath') || '/',
    lsSkipTime: localStorage.getItem('vlc-skipTime') || '5',
    lsStoreBrowserPath,
    lsStoreSkipTime,
  }

  return <LSCtx.Provider value={value}>{children}</LSCtx.Provider>
}

export { LSProvider }
export default LSCtx
