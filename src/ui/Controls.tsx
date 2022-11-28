import React, { FC, useContext, useEffect, useState } from 'react'

import { AppCtx } from '@src/App'

import { second2Time } from '@utils/secont2time'

import { ReactComponent as PlaySvg } from '@svg/play.svg'

// Title
// Time
// Seek
// Volume

// Play/Pause
// Next
// Prev

// Forward
// Backwards

// Actions
//// Fullscreen
//// Settings

const Seek: FC<{ seek: (pos: string) => void }> = ({ seek }) => {
  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    seek(value + '%')
  }

  return <input className="controls__seek" onChange={onSeek} type="range" value="50%" />
}

const Controls: FC<{}> = () => {
  const { vlc } = useContext(AppCtx)
  const [status, setStatus] = useState<Status>()

  const updateStatus = () => vlc.status().then(setStatus)

  // updateStatus()
  useEffect(() => {
    const updateStatusInterval = setInterval(updateStatus, 1000)

    return () => {
      clearInterval(updateStatusInterval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section id="controls">
      <div className="controls__current">{status?.title}</div>
      <div className="controls__time">
        <Seek seek={vlc.controls.seek} />
        <div>
          {second2Time(status?.time.current)} / {second2Time(status?.time.length)}
        </div>
      </div>

      {
        <button>
          <PlaySvg />
        </button>
      }
    </section>
  )
}

export default Controls
