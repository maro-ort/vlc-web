import React, { FC } from 'react'

import { AppProvider } from '@ctx/app.ctx'
import { UiProvider } from '@ctx/ui.ctx'



const CtxWrapper: FC<{ children: React.ReactNode}> = ({
  children
}) => (
  <AppProvider>
    <UiProvider>
      {children}
    </UiProvider>
  </AppProvider>
)

export default CtxWrapper