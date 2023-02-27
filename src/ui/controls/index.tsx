import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { AppCtx } from '@src/App'

import Actions from '@ui/controls/Actions'
import Volume from '@ui/controls/Volume'
import Seek from '@ui/controls/Seek'

const Controls: FC<{}> = () => {
  const { vlc } = useContext(AppCtx)
  const [status, setStatus] = useState<Status>()
  const [updateStatusDelay, setUpdateStatusDelay] = useState(1000)
  const [title, setTitle] = useState<string>()

  const updateStatus = useCallback(() => {
    vlc.status().then(setStatus)
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

  return (
    <section id="controls">
      <Helmet title={title} />

      <div className="controls__current">{status?.title}</div>

      <Seek
        seek={pos => {
          vlc.controls.seek(pos).then(updateStatus)
        }}
        time={status?.time}
      />

      <Volume
        vol={status?.volume ?? 0}
        setVol={vol => {
          vlc.controls.volume(vol).then(updateStatus)
        }}
      />

      <Actions controls={vlc.controls} status={status} updateStatus={updateStatus} />
    </section>
  )
}

export default Controls
