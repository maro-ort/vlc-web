import React, { createContext, FC, useCallback, useContext, useEffect, useState } from 'react'

import LSCtx from '@ctx/ls.ctx'
import VLC from '@src/vlc'
import Password from '@src/ui/Password'

const ConnectionCtx = createContext<{
  vlcPassword?: string
}>({})

const ConnectionProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { lsPassword, lsStorePassword } = useContext(LSCtx)
  const [vlcPassword, setVlcPassword] = useState(lsPassword)

  const [hasConnection, setHasConnection] = useState(false)

  useEffect(() => {
    if (lsPassword) testPassword(lsPassword)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const testPassword = useCallback(
    (password: string): Promise<boolean> => {
      const vlc = new VLC(password)
      return vlc
        .status()
        .then(r => {
          lsStorePassword?.(password)
          setHasConnection(true)
          setVlcPassword(password)
          return true
        })
        .catch(e => {
          lsStorePassword?.('')
          setHasConnection(false)
          setVlcPassword(undefined)
          throw new Error(e)
        })
    },
    [setVlcPassword, lsStorePassword, setHasConnection]
  )

  if (!hasConnection) return <Password lsPassword={lsPassword} testPassword={testPassword} />

  const value = {
    vlcPassword,
  }

  return <ConnectionCtx.Provider value={value}>{children}</ConnectionCtx.Provider>
}

export { ConnectionProvider }
export default ConnectionCtx
