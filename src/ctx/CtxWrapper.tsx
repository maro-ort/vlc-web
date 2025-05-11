import type { PropsWithChildren } from 'react'
import { AppProvider } from './AppProvider/AppProvider'
import { ConnectionProvider } from './ConnectionProvider/ConnectionProvider'
import { LSProvider } from './LSProvider/LSProvider'
import { UiProvider } from './UIProvider/UIProvider'

export default function CtxWrapper ({ children }: PropsWithChildren): React.JSX.Element {
  return (
    <LSProvider>
      <ConnectionProvider>
        <AppProvider>
          <UiProvider>
            {children}
          </UiProvider>
        </AppProvider>
      </ConnectionProvider>
    </LSProvider>
  )
}
