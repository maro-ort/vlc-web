import React, { FC } from 'react'
import cx from 'classnames'

import { ReactComponent as CheckEmptySvg } from '@svg/check-empty.svg'
import { ReactComponent as CheckFullSvg } from '@svg/check-full.svg'

const Checkbox: FC<{
  className?: string
  value?: string
  checked?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, value?: string) => void
}> = ({ className, value, checked, onChange }) => {
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>, value?: string) => {
    if (onChange) onChange(e, value)
  }

  return (
    <label className={cx('button checkbox-wrapper')}>
      <input type="checkbox" value={value} onChange={e => handleToggle(e, value)} defaultChecked={checked} />
      <CheckFullSvg className="tick" />
    </label>
  )
}

export default Checkbox
