import React, { FC } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import './scss/main.scss'

import CtxWrapper from '@ctx/ctx-wrapper'

import Controls from '@ui/controls'
import FileBrowser from '@ui/FileBrowser'
import Playlist from '@ui/Playlist'

const App: FC<{}> = () => {
  return (
    <HelmetProvider>
      <CtxWrapper>
        <section id="drawer">
          <Playlist />
          <FileBrowser />
        </section>
        <Controls />
      </CtxWrapper>
    </HelmetProvider>
  )
}

export default App
