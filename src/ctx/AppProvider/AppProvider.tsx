import React, {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useConnection } from '@ctx'
import VLCApi from '@vlc'
import type { PropsWithChildren } from 'react'
import type { PlaylistItem } from '@types'
import type { AppContext } from './types'

const AppCtx = createContext<AppContext>({
  currentPlaylist: [],
  updatePlaylist: () => { throw new Error('Function updatePlaylist not implemented.') },
})

function AppProvider ({ children }: PropsWithChildren): React.JSX.Element {
  const { vlcPassword } = useConnection()
  const vlc = useMemo(() => {
    return vlcPassword != null
      ? new VLCApi(vlcPassword)
      : undefined
  }, [vlcPassword])
  const [currentPlaylist, setCurrentPlaylist] = useState<PlaylistItem[]>([])

  const updatePlaylist = useCallback(() => {
    void vlc?.fetchPlaylist().then(setCurrentPlaylist)
  }, [vlc, setCurrentPlaylist])

  useEffect(() => {
    updatePlaylist()
    const updateStatusInterval = setInterval(updatePlaylist, 10000)
    return () => { clearInterval(updateStatusInterval) }
  }, [updatePlaylist])

  const value = {
    vlc,
    currentPlaylist,
    updatePlaylist,
  }

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>
}

function useApp (): AppContext {
  return use(AppCtx)
}

export { AppProvider }
export default useApp
