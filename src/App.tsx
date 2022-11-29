import React, { createContext, FC, ReactNode } from 'react'
import FileBrowser from './ui/FileBrowser'
import Playlist from './ui/Playlist'
import './scss/main.scss'

import VLC from '@vlc/index'
import Controls from '@ui/controls'

export const AppCtx = createContext({
  vlc: new VLC(),
  DEFAULT_PATH: '/home/aumon',
})

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const vlc = new VLC()

  const DEFAULT_PATH = localStorage.getItem('vlc-path')

  if (!DEFAULT_PATH) localStorage.setItem('vlc-path', '/home/aumon')

  const value = {
    vlc,
    DEFAULT_PATH: DEFAULT_PATH ?? '/home/aumon',
  }

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>
}

const App: FC<{}> = () => {
  return (
    <AppProvider>
      <section id="drawer">
        <Playlist />
        <FileBrowser />
      </section>
      <Controls />
    </AppProvider>
  )
}

export default App
