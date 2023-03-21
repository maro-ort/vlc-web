import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'

import AppCtx from '@ctx/app.ctx'
import LSCtx from '@ctx/ls.ctx'

import Actions from '@ui/controls/Actions'
import Volume from '@ui/controls/Volume'
import Seek from '@ui/controls/Seek'

const Controls: FC<{}> = () => {
  const { vlc } = useContext(AppCtx)
  const { lsSkipTime } = useContext(LSCtx)
  const [status, setStatus] = useState<Status>()
  const [updateStatusDelay, setUpdateStatusDelay] = useState(1000)
  const [title, setTitle] = useState<string>()
  const [skipTime, setSkipTime] = useState(lsSkipTime)

  const updateStatus = useCallback(() => {
    vlc?.status().then(setStatus)
  }, [vlc])

  // updateStatus()
  useEffect(() => {
    updateStatus()
    const updateStatusInterval = setInterval(updateStatus, updateStatusDelay)
    return () => clearInterval(updateStatusInterval)
  }, [updateStatus, updateStatusDelay])

  // updateStatusDelay
  useEffect(() => {
    if (!status?.state) return
    else if (['paused', 'stopped'].includes(status.state)) setUpdateStatusDelay(5000)
    else setUpdateStatusDelay(1000)
  }, [status?.state])

  // Update title
  useEffect(() => {
    const newTitle = status?.title
      ? `${['paused', 'stopped'].includes(status.state) ? `[${status.state}] - ` : ''}${status.title}`
      : 'VLC'
    setTitle(newTitle)
  }, [status?.state, status?.title])

  // Keybindings
  useEffect(() => {
    const keyDetect = (e: KeyboardEvent) => {
      const { code } = e
      const actions = {
        ArrowDown: () => vlc?.volume('-10').then(updateStatus),
        ArrowLeft: () => vlc?.seek('-' + skipTime).then(updateStatus),
        ArrowRight: () => vlc?.seek('+' + skipTime).then(updateStatus),
        ArrowUp: () => vlc?.volume('+10').then(updateStatus),
        Space: () => vlc?.togglePause().then(updateStatus),
      } as Record<string, () => void>

      if (code in actions) {
        e.preventDefault()
        actions[code]()
      }
    }
    document.addEventListener('keydown', keyDetect)

    return () => {
      document.removeEventListener('keydown', keyDetect)
    }
  }, [skipTime, updateStatus, vlc])

  if (!vlc) return <></>

  return (
    <section id="controls">
      <Helmet title={title} />

      <div className="controls__current">{status?.title}</div>

      <div className="controls__bars">
        <Seek seek={pos => vlc?.seek(pos).then(updateStatus)} time={status?.time} />

        <Volume vol={status?.volume ?? 0} setVol={vol => vlc?.volume(vol).then(updateStatus)} />
      </div>

      <Actions vlc={vlc} status={status} updateStatus={updateStatus} skipTime={skipTime} setSkipTime={setSkipTime} />
    </section>
  )
}

export default Controls
