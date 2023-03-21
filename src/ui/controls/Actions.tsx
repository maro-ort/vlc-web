import { Dispatch, FC, SetStateAction, useCallback, useContext } from 'react'
import cx from 'classnames'

import AppCtx from '@ctx/app.ctx'
import LSCtx from '@ctx/ls.ctx'
import VLC from '@src/vlc'

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

const skipTimes = ['5', '10', '20', '30', '45', '60']

const Actions: FC<{
  vlc: VLC
  status?: Status
  skipTime: string
  updateStatus: () => void
  setSkipTime: Dispatch<SetStateAction<string>>
}> = ({ vlc, status, updateStatus, skipTime, setSkipTime }) => {
  const { lsStoreSkipTime } = useContext(LSCtx)
  const { updatePlaylist } = useContext(AppCtx)

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
      <button className="skipB" title="Skip backwards" onClick={() => vlc.seek('-' + skipTime).then(updateStatus)}>
        <RewindSVG />
      </button>
      <button className="skipF" title="Skip forward" onClick={() => vlc.seek('+' + skipTime).then(updateStatus)}>
        <FastForwardSVG />
      </button>

      <button className="clear" title="Clear playlist" onClick={() => vlc.clearPlaylist().then(updateStatus)}>
        <XSVG />
      </button>

      <button
        className={cx('fulls', { '--active': status?.options.fullscreen })}
        title="Fullscreen"
        onClick={() => vlc.fullscreen().then(updateStatus)}
      >
        {status?.options.fullscreen ? <MinimizeSVG /> : <MaximizeSVG />}
      </button>

      <button className="prev" title="Previous" onClick={() => vlc.prev().then(updateStatus).then(updatePlaylist)}>
        <SkipBackSVG />
      </button>

      <button className="next" title="Next" onClick={() => vlc.next().then(updateStatus).then(updatePlaylist)}>
        <SkipForwardSVG />
      </button>

      <button className="play" title="Toggle play" onClick={() => vlc.togglePause().then(updateStatus)}>
        {playIcon}
      </button>
    </div>
  )
}

export default Actions
