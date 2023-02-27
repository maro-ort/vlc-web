import { FC, useCallback, useState } from 'react'
import cx from 'classnames'

import { Controls } from '@src/vlc'

import { ReactComponent as FastForwardSVG } from '@svg/fast-forward.svg'
import { ReactComponent as MaximizeSVG } from '@svg/maximize.svg'
import { ReactComponent as MinimizeSVG } from '@svg/minimize.svg'
import { ReactComponent as PauseSVG } from '@svg/pause.svg'
import { ReactComponent as PlaySVG } from '@svg/play.svg'
import { ReactComponent as RewindSVG } from '@svg/rewind.svg'
import { ReactComponent as SettingsSVG } from '@svg/settings.svg'
import { ReactComponent as SkipBackSVG } from '@svg/skip-back.svg'
import { ReactComponent as SkipForwardSVG } from '@svg/skip-forward.svg'
import { ReactComponent as SquareSVG } from '@svg/square.svg'

const skipTimes = ['5', '10', '20', '30', '45', '60']

const Actions: FC<{
  controls: Controls
  status?: Status
  updateStatus: () => void
}> = ({ controls, status, updateStatus }) => {
  const [skipTime, setSkipTime] = useState(skipTimes[0])

  const updateSkipTime = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const seconds = e.target.value
      setSkipTime(seconds)
    },
    [setSkipTime]
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
      <button className="skipB" onClick={() => controls.seek('-' + skipTime).then(updateStatus)}>
        <RewindSVG />
      </button>
      <button className="skipF" onClick={() => controls.seek('+' + skipTime).then(updateStatus)}>
        <FastForwardSVG />
      </button>

      <button className="settg">
        <SettingsSVG />
      </button>

      <button
        className={cx('fulls', { '--active': status?.options.fullscreen })}
        onClick={() => controls.fullscreen().then(updateStatus)}
      >
        {status?.options.fullscreen ? <MinimizeSVG /> : <MaximizeSVG />}
      </button>

      <button className="prev" onClick={() => controls.prev().then(updateStatus)}>
        <SkipBackSVG />
      </button>

      <button className="next" onClick={() => controls.next().then(updateStatus)}>
        <SkipForwardSVG />
      </button>

      <button className="play" onClick={() => controls.togglePause().then(updateStatus)}>
        {playIcon}
      </button>
    </div>
  )
}

export default Actions
