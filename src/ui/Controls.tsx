import React, { FC, useContext, useEffect, useState } from 'react'

import { AppCtx } from '@src/App'

import { second2Time } from '@utils/secont2time'

import { ReactComponent as PlaySvg } from '@svg/play.svg'

// 23E9 ⏩︎ fast forward
// 23EA ⏪︎ rewind, fast backwards
// 23EB ⏫︎ fast increase
// 23EC ⏬︎ fast decrease
// 23ED ⏭︎ skip to end, next
// 23EE ⏮︎ skip to start, previous
// 23EF ⏯︎ play/pause toggle
// 23F1 ⏱︎ stopwatch
// 23F2 ⏲︎ timer clock
// 23F3 ⏳︎ hourglass
// 23F4 ⏴︎ reverse, back
// 23F5 ⏵︎ forward, next, play
// 23F6 ⏶︎ increase
// 23F7 ⏷︎ decrease
// 23F8 ⏸︎ pause
// 23F9 ⏹︎ stop

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
  const [updateStatusDelay, setUpdateStatusDelay] = useState(500)

  const updateStatus = () => {
    vlc.status().then(setStatus)
  }

  // updateStatusDelay
  useEffect(() => {
    if (!status?.state) return
    else if (['paused', 'stopped'].includes(status.state)) setUpdateStatusDelay(5000)
    else setUpdateStatusDelay(500)
  }, [status?.state])

  // updateStatus()
  useEffect(() => {
    const updateStatusInterval = setInterval(updateStatus, updateStatusDelay)

    return () => {
      clearInterval(updateStatusInterval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateStatusDelay])

  return (
    <section id="controls">
      <div className="controls__current">{status?.title}</div>
      <Seek seek={vlc.controls.seek} />
      <div className="controls__time">
        <div>
          {second2Time(status?.time.current)} / {second2Time(status?.time.length)}
        </div>

        <div>
          <select>
            <option>5</option>
            <option>10</option>
            <option>15</option>
          </select>
          <button>⏪︎</button>
          <button>⏩︎</button>
        </div>
      </div>

      <div>
        <div className="controls__actions">
          <select>
            <option>5</option>
            <option>10</option>
            <option>15</option>
          </select>
          <button>⏪︎</button>
          <button>⏩︎</button>

          <button>
            <PlaySvg />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Controls
