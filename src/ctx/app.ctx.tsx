import React, { createContext, FC, useCallback, useEffect, useState } from 'react'

import VLC from '@vlc/index'

const AppCtx = createContext<{
  DEFAULT_PATH: string
  vlc: VLC
  currentPlaylist: PlaylistItem[]
  updatePlaylist?: () => void
}>({
  DEFAULT_PATH: '/home/aumon',
  vlc: new VLC(),
  currentPlaylist: [],
})

const AppProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const vlc = new VLC()
  const [currentPlaylist, setCurrentPlaylist] = useState<PlaylistItem[]>([])

  const updatePlaylist = useCallback(() => {
    vlc.playlist.fetch().then(setCurrentPlaylist)
  }, [vlc, setCurrentPlaylist])

  useEffect(() => {
    if (!updatePlaylist) return
    updatePlaylist()
    const updateStatusInterval = setInterval(updatePlaylist, 10000)
    return () => clearInterval(updateStatusInterval)
  }, [])

  const DEFAULT_PATH = localStorage.getItem('vlc-path')

  if (!DEFAULT_PATH) localStorage.setItem('vlc-path', '/home/aumon')

  const value = {
    vlc,
    currentPlaylist,
    updatePlaylist,
    DEFAULT_PATH: DEFAULT_PATH ?? '/home/aumon',
  }

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>
}

export { AppProvider }
export default AppCtx