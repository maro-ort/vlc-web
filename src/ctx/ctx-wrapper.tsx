import React, { FC } from 'react'

import { AppProvider } from '@ctx/app.ctx'
import { UiProvider } from '@ctx/ui.ctx'
import { LSProvider } from '@ctx/ls.ctx'
import { ConnectionProvider } from '@ctx/connection.ctx'

const CtxWrapper: FC<{ children: React.ReactNode }> = ({ children }) => (
  <LSProvider>
    <ConnectionProvider>
      <AppProvider>
        <UiProvider>{children}</UiProvider>
      </AppProvider>
    </ConnectionProvider>
  </LSProvider>
)

export default CtxWrapper
