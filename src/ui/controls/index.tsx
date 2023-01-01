import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import cx from 'classnames'
import { Helmet } from 'react-helmet-async'

import { AppCtx } from '@src/App'

import { second2Time } from '@utils/secont2time'

import Actions from '@ui/controls/Actions'
import Volume from '@ui/controls/Volume'
import Seek from '@ui/controls/Seek'
import Slider from '@ui/common/Slider'

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

const Controls: FC<{}> = () => {
  const { vlc } = useContext(AppCtx)
  const [status, setStatus] = useState<Status>()
  const [updateStatusDelay, setUpdateStatusDelay] = useState(500)
  const [title, setTitle] = useState<string>()

  const updateStatus = useCallback(() => {
    vlc.status().then(setStatus)
  }, [vlc])

  // updateStatus()
  useEffect(() => {
    const updateStatusInterval = setInterval(updateStatus, updateStatusDelay)
    return () => clearInterval(updateStatusInterval)
  }, [updateStatus, updateStatusDelay])

  // updateStatusDelay
  useEffect(() => {
    if (!status?.state) return
    else if (['paused', 'stopped'].includes(status.state)) setUpdateStatusDelay(5000)
    else setUpdateStatusDelay(500)
  }, [status?.state])

  // Update title
  useEffect(() => {
    const newTitle = status?.title
      ? `${['paused', 'stopped'].includes(status.state) ? `[${status.state}] - ` : ''}${status.title}`
      : 'VLC'
    setTitle(newTitle)
  }, [status?.state, status?.title])

  return (
    <section id="controls">
      <Helmet title={title} />

      <div className="controls__current">{status?.title}</div>

      <Seek seek={vlc.controls.seek} time={status?.time} />

      <div className="controls__time">
        <div>
          <div>{second2Time(status?.time.current)}</div>
          <div>{second2Time(status?.time.length)}</div>
        </div>

        <Volume vol={status?.volume ?? 0} setVol={vlc.controls.volume} />
      </div>

      <Actions controls={vlc.controls} status={status} />
    </section>
  )
}

export default Controls
