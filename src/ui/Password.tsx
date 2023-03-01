import React, { FC, useCallback, useState } from 'react'

import { ReactComponent as LoadingSvg } from '@svg/refresh-cw.svg'

const Password: FC<{ lsPassword?: string; testPassword: (password: string) => Promise<boolean> }> = ({
  lsPassword,
  testPassword,
}) => {
  const [password, setPassword] = useState('')
  const [isTesting, setIsTesting] = useState(false)
  const [error, setError] = useState<string>()

  const checkPassword = useCallback(() => {
    setIsTesting(true)
    testPassword(password)
      .catch((e: Error) => {
        if (e.message.includes('401')) setError('Invalid password')
        else setError('Cannot communicate with VLC')
      })
      .finally(() => setIsTesting(false))
  }, [password, testPassword])

  const handlePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value)
      setError(undefined)
    },
    [setPassword, setError]
  )

  const handlePressEnter = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.code === 'Enter') checkPassword()
    },
    [checkPassword]
  )

  return (
    <div id="password">
      {lsPassword ? (
        <LoadingSvg className="password__loading" />
      ) : (
        <div className="password__form">
          <div>Enter VLC password</div>
          <input type="password" onChange={handlePassword} onKeyDown={handlePressEnter} value={password} />
          <button onClick={checkPassword}>{isTesting ? <LoadingSvg /> : 'Submit'}</button>
          {error && <div className="password__error">{error}</div>}
        </div>
      )}
    </div>
  )
}

export default Password
