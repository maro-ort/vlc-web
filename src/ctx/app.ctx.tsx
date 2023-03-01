import React, { createContext, FC, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import VLC from '@vlc/index'
import ConnectionCtx from './connection.ctx'

const AppCtx = createContext<{
  vlc?: VLC
  currentPlaylist: PlaylistItem[]
  updatePlaylist?: () => void
}>({
  currentPlaylist: [],
})

const AppProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { vlcPassword } = useContext(ConnectionCtx)
  const vlc = useMemo(() => (vlcPassword ? new VLC(vlcPassword) : undefined), [vlcPassword])
  const [currentPlaylist, setCurrentPlaylist] = useState<PlaylistItem[]>([])

  const updatePlaylist = useCallback(() => {
    vlc?.playlist.fetch().then(setCurrentPlaylist)
  }, [vlc, setCurrentPlaylist])

  useEffect(() => {
    if (!updatePlaylist) return
    updatePlaylist()
    const updateStatusInterval = setInterval(updatePlaylist, 10000)
    return () => clearInterval(updateStatusInterval)
  }, [updatePlaylist])

  const value = {
    vlc,
    currentPlaylist,
    updatePlaylist,
  }

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>
}

export { AppProvider }
export default AppCtx
