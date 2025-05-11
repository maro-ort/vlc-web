import React, { useCallback, useState } from 'react'
import LoadingSvg from '@svg/refresh-cw.svg?react'
import type { PasswordProps } from './types'

function Password ({ lsPassword, testPassword }: PasswordProps): React.JSX.Element {
  const [password, setPassword] = useState('')
  const [isTesting, setIsTesting] = useState(false)
  const [error, setError] = useState<string>()

  const checkPassword = useCallback(() => {
    setIsTesting(true)
    testPassword(password)
      .catch((e: unknown) => {
        if (e instanceof Error) {
          if (e.message.includes('401')) setError('Invalid password')
          else setError('Cannot communicate with VLC')
        } else {
          setError('Unknown error')
        }
      })
      .finally(() => { setIsTesting(false) })
  }, [password, testPassword])

  const handlePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value)
      setError(undefined)
    },
    [setPassword, setError],
  )

  const handlePressEnter = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.code === 'Enter') checkPassword()
    },
    [checkPassword],
  )

  function renderForm (): React.JSX.Element {
    if (lsPassword != null) {
      return <LoadingSvg className="password__loading" />
    }

    return (
      <div className="password__form">
        <div>Enter VLC password</div>
        <input
          onChange={handlePassword}
          onKeyDown={handlePressEnter}
          type="password"
          value={password}
        />
        <button onClick={checkPassword}>
          {isTesting ? <LoadingSvg /> : 'Submit'}
        </button>
        {error != null && <div className="password__error">{error}</div>}
      </div>
    )
  }

  return (
    <div id="password">
      {renderForm()}
    </div>
  )
}

export default Password
