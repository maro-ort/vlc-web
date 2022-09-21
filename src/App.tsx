import React, { createContext, FC, ReactNode } from 'react'
import FileBrowser from './FileBrowser'
import Playlist from './Playlist'
import './scss/main.scss'

import VLC from './vlc'
import Controls from './vlc/Controls'

export const AppCtx = createContext({
  vlc: new VLC(),
})

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const vlc = new VLC()

  const value = {
    vlc,
  }

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>
}

const App: FC<{}> = () => {
  return (
    <AppProvider>
      <div id="drawer">
        <FileBrowser />
        <Playlist />
      </div>
      <Controls />
    </AppProvider>
  )
}

export default App
