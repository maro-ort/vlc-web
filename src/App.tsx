import React, { createContext, FC, ReactNode } from 'react'
import FileBrowser from './ui/FileBrowser'
import Playlist from './ui/Playlist'
import './scss/main.scss'

import VLC from '@vlc/index'
import Controls from '@ui/Controls'

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
      {/* <div id="drawer"> */}
      <Playlist />
      <FileBrowser />
      {/* </div> */}
      <Controls />
    </AppProvider>
  )
}

export default App
