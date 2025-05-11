import React, { useCallback, useEffect, useState } from 'react'
import Actions from './Actions/Actions'
import Volume from './Volume/Volume'
import Seek from './Seek/Seek'
import { useApp, useLS } from '@ctx'
import type { Status } from '@types'

function Controls (): React.JSX.Element {
  const { vlc } = useApp()
  const { lsSkipTime } = useLS()
  const [skipTime, setSkipTime] = useState(lsSkipTime)
  const [status, setStatus] = useState<Status>()
  const [title, setTitle] = useState<string>()
  const [updateStatusDelay, setUpdateStatusDelay] = useState(1000)

  const updateStatus = useCallback(() => {
    void vlc?.status().then(setStatus)
  }, [vlc])

  useEffect(() => {
    updateStatus()
    const updateStatusInterval = setInterval(updateStatus, updateStatusDelay)
    return () => { clearInterval(updateStatusInterval) }
  }, [updateStatus, updateStatusDelay])

  useEffect(() => {
    if (status?.state != null && ['paused', 'stopped'].includes(status.state)) {
      setUpdateStatusDelay(5000)
    } else {
      setUpdateStatusDelay(1000)
    }
  }, [status?.state])

  useEffect(() => {
    const newTitle = status?.title != null
      ? `${['paused', 'stopped'].includes(status.state)
        ? `[${status.state}] - `
        : ''}${status.title}`
      : 'VLC'
    setTitle(newTitle)
  }, [status?.state, status?.title])

  useEffect(() => {
    function keyDetect (e: KeyboardEvent): void {
      const { code } = e
      const actions: Record<string, () => Promise<void>> = {
        ArrowDown: async () => await vlc?.volume('-10').then(updateStatus),
        ArrowLeft: async () => await vlc?.seek('-' + skipTime).then(updateStatus),
        ArrowRight: async () => await vlc?.seek('+' + skipTime).then(updateStatus),
        ArrowUp: async () => await vlc?.volume('+10').then(updateStatus),
        Space: async () => await vlc?.togglePause().then(updateStatus),
      }

      if (code in actions) {
        e.preventDefault()
        void actions[code]()
      }
    }
    document.addEventListener('keydown', keyDetect)

    return () => {
      document.removeEventListener('keydown', keyDetect)
    }
  }, [skipTime, updateStatus, vlc])

  if (vlc == null) return <></>

  return (
    <section id="controls">
      <title>{title}</title>
      <div className="controls__current">{status?.title}</div>
      <div className="controls__bars">
        <Seek
          seek={pos => { void vlc?.seek(pos).then(updateStatus) }}
          time={status?.time}
        />
        <Volume
          setVol={vol => { void vlc?.volume(vol).then(updateStatus) }}
          vol={status?.volume ?? 0}
        />
      </div>
      <Actions
        vlc={vlc}
        status={status}
        updateStatus={updateStatus}
        skipTime={skipTime} setSkipTime={setSkipTime}
      />
    </section>
  )
}

export default Controls
