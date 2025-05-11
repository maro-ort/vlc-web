import React, { createContext, use, useMemo } from 'react'
import type { PropsWithChildren } from 'react'
import type { LSContext } from './types'

const LSCtx = createContext<LSContext>({
  lsBrowserPath: '/',
  lsPassword: undefined,
  lsSkipTime: '5',
  lsStoreBrowserPath: () => { throw new Error('Function lsStoreBrowserPath not implemented.') },
  lsStorePassword: () => { throw new Error('Function lsStorePassword not implemented.') },
  lsStoreSkipTime: () => { throw new Error('Function lsStoreSkipTime not implemented.') },
})

function LSProvider ({ children }: PropsWithChildren): React.JSX.Element {
  function lsStoreBrowserPath (val: string): void {
    localStorage.setItem('vlc-browserPath', val)
  }

  function lsStorePassword (val: string): void {
    localStorage.setItem('vlc-password', val)
  }

  function lsStoreSkipTime (val: string): void {
    localStorage.setItem('vlc-skipTime', val)
  }

  const value = useMemo(() => ({
    lsBrowserPath: localStorage.getItem('vlc-browserPath') ?? '/',
    lsPassword: localStorage.getItem('vlc-password') ?? undefined,
    lsSkipTime: localStorage.getItem('vlc-skipTime') ?? '5',
    lsStoreBrowserPath,
    lsStorePassword,
    lsStoreSkipTime,
  }), [])

  return (
    <LSCtx value={value}>
      {children}
    </LSCtx>
  )
}

function useLS (): LSContext {
  return use(LSCtx)
}

export { LSProvider }
export default useLS
