import React, { createContext, FC, ReactNode, useCallback, useEffect, useState } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import './scss/main.scss'

import VLC from '@vlc/index'
import Controls from '@ui/controls'
import FileBrowser from '@ui/FileBrowser'
import Playlist from '@ui/Playlist'

export const AppCtx = createContext<{
  DEFAULT_PATH: string
  vlc: VLC
  currentPlaylist: PlaylistItem[]
  updatePlaylist?: () => void
}>({
  DEFAULT_PATH: '/home/aumon',
  vlc: new VLC(),
  currentPlaylist: [],
})

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
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

const App: FC<{}> = () => {
  return (
    <HelmetProvider>
      <AppProvider>
        <section id="drawer">
          <Playlist />
          <FileBrowser />
        </section>
        <Controls />
      </AppProvider>
    </HelmetProvider>
  )
}

export default App
