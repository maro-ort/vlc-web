import React, { FC } from 'react'

import { AppProvider } from '@ctx/app.ctx'
import { UiProvider } from '@ctx/ui.ctx'
import { LSProvider } from './ls.ctx'

const CtxWrapper: FC<{ children: React.ReactNode }> = ({ children }) => (
  <LSProvider>
    <AppProvider>
      <UiProvider>{children}</UiProvider>
    </AppProvider>
  </LSProvider>
)

export default CtxWrapper
