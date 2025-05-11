import React, { createContext, use, useCallback, useEffect, useState } from 'react'
import { useLS } from '@ctx'
import VLCApi from '@vlc'
import Password from '@ui/Password/Password'
import type { PropsWithChildren } from 'react'
import type { ConntectionContext } from './types'

const ConnectionCtx = createContext<ConntectionContext>({
  vlcPassword: undefined,
})

function ConnectionProvider ({ children }: PropsWithChildren): React.JSX.Element {
  const { lsPassword, lsStorePassword } = useLS()
  const [vlcPassword, setVlcPassword] = useState(lsPassword)
  const [hasConnection, setHasConnection] = useState(false)

  useEffect(() => {
    if (lsPassword != null) {
      void testPassword(lsPassword)
    }
  }, [])

  const testPassword = useCallback(
    async (password: string): Promise<boolean> => {
      const vlc = new VLCApi(password)
      return await vlc
        .status()
        .then(() => {
          lsStorePassword?.(password)
          setHasConnection(true)
          setVlcPassword(password)
          return true
        })
        .catch((error: unknown) => {
          lsStorePassword?.('')
          setHasConnection(false)
          setVlcPassword(undefined)
          if (error instanceof Error) {
            throw error
          } else {
            throw new Error('Unknown error')
          }
        })
    },
    [setVlcPassword, lsStorePassword, setHasConnection],
  )

  if (!hasConnection) {
    return <Password lsPassword={lsPassword} testPassword={testPassword} />
  }

  const value = {
    vlcPassword,
  }

  return <ConnectionCtx.Provider value={value}>{children}</ConnectionCtx.Provider>
}

function useConnection (): ConntectionContext {
  return use(ConnectionCtx)
}

export { ConnectionProvider }
export default useConnection
