import React, {
  createContext,
  use,
  useCallback,
  useMemo,
  useState,
} from 'react'
import type { PropsWithChildren } from 'react'
import type { UIContext } from './types'

const UiCtx = createContext<UIContext>({
  filebrowserIsOpen: false,
  toggleFileBrowserOpen: () => { throw new Error ('Function toggleFileBrowserOpen not implemented') },
})

function UiProvider ({ children }: PropsWithChildren): React.JSX.Element {
  const [filebrowserIsOpen, setFilebrowserIsOpen] = useState(false)

  const toggleFileBrowserOpen = useCallback(() => {
    setFilebrowserIsOpen(!filebrowserIsOpen)
  }, [filebrowserIsOpen, setFilebrowserIsOpen])

  const value = useMemo(() => ({
    filebrowserIsOpen,
    toggleFileBrowserOpen,
  }), [filebrowserIsOpen, toggleFileBrowserOpen])

  return <UiCtx.Provider value={value}>{children}</UiCtx.Provider>
}

function useUi (): UIContext {
  return use(UiCtx)
}

export { UiProvider }
export default useUi
