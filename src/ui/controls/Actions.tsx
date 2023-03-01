import { FC, useCallback, useContext, useState } from 'react'
import cx from 'classnames'

import LSCtx from '@ctx/ls.ctx'
import { Controls } from '@src/vlc'

import { ReactComponent as FastForwardSVG } from '@svg/fast-forward.svg'
import { ReactComponent as MaximizeSVG } from '@svg/maximize.svg'
import { ReactComponent as MinimizeSVG } from '@svg/minimize.svg'
import { ReactComponent as PauseSVG } from '@svg/pause.svg'
import { ReactComponent as PlaySVG } from '@svg/play.svg'
import { ReactComponent as RewindSVG } from '@svg/rewind.svg'
import { ReactComponent as SkipBackSVG } from '@svg/skip-back.svg'
import { ReactComponent as SkipForwardSVG } from '@svg/skip-forward.svg'
import { ReactComponent as SquareSVG } from '@svg/square.svg'
import { ReactComponent as XSVG } from '@svg/x.svg'
import AppCtx from '@ctx/app.ctx'

const skipTimes = ['5', '10', '20', '30', '45', '60']

const Actions: FC<{
  controls: Controls
  status?: Status
  clearPlaylist: () => Promise<any>
  updateStatus: () => void
}> = ({ controls, status, clearPlaylist, updateStatus }) => {
  const { lsSkipTime, lsStoreSkipTime } = useContext(LSCtx)
  const { updatePlaylist } = useContext(AppCtx)
  const [skipTime, setSkipTime] = useState(lsSkipTime)

  const updateSkipTime = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const seconds = e.target.value
      setSkipTime(seconds)
      lsStoreSkipTime?.(seconds)
    },
    [lsStoreSkipTime, setSkipTime]
  )

  const playIcon = {
    stopped: <SquareSVG />,
    paused: <PlaySVG />,
    playing: <PauseSVG />,
  }[status?.state || 'stopped']

  return (
    <div className="controls__actions">
      <select className="skipT" onChange={updateSkipTime} value={skipTime}>
        {skipTimes.map((v, i) => (
          <option key={i} value={v}>
            {v} s
          </option>
        ))}
      </select>
      <button className="skipB" title="Skip backwards" onClick={() => controls.seek('-' + skipTime).then(updateStatus)}>
        <RewindSVG />
      </button>
      <button className="skipF" title="Skip forward" onClick={() => controls.seek('+' + skipTime).then(updateStatus)}>
        <FastForwardSVG />
      </button>

      <button className="clear" title="Clear playlist" onClick={() => clearPlaylist().then(updateStatus)}>
        <XSVG />
      </button>

      <button
        className={cx('fulls', { '--active': status?.options.fullscreen })}
        title="Fullscreen"
        onClick={() => controls.fullscreen().then(updateStatus)}
      >
        {status?.options.fullscreen ? <MinimizeSVG /> : <MaximizeSVG />}
      </button>

      <button className="prev" title="Previous" onClick={() => controls.prev().then(updateStatus).then(updatePlaylist)}>
        <SkipBackSVG />
      </button>

      <button className="next" title="Next" onClick={() => controls.next().then(updateStatus).then(updatePlaylist)}>
        <SkipForwardSVG />
      </button>

      <button className="play" title="Toggle play" onClick={() => controls.togglePause().then(updateStatus)}>
        {playIcon}
      </button>
    </div>
  )
}

export default Actions
