import React, { FC } from 'react'

import { ReactComponent as PlaySvg } from '@svg/play.svg'

const Controls: FC<{}> = () => {
  return (
    <section id="controls">
      {
        <button>
          <PlaySvg />
        </button>
      }
    </section>
  )
}

export default Controls
