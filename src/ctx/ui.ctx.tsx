import React, { createContext, FC, useCallback, useState } from 'react'

const UiCtx = createContext<{
  filebrowserIsOpen: boolean
  toggleFileBrowserOpen?: () => void
}>({
  filebrowserIsOpen: false
})

const UiProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ filebrowserIsOpen, setFilebrowserIsOpen ] = useState(false)

  const toggleFileBrowserOpen = useCallback(() => {
    setFilebrowserIsOpen(!filebrowserIsOpen)
  }, [ filebrowserIsOpen, setFilebrowserIsOpen ])

  const value = {
    filebrowserIsOpen,
    toggleFileBrowserOpen
  }

  return <UiCtx.Provider value={value}>{children}</UiCtx.Provider>
}

export { UiProvider }
export default UiCtx