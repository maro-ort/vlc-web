import { useCallback } from 'react'
import cx from 'classnames'
import { useApp, useLS } from '@ctx'
import FastForwardSVG from '@svg/fast-forward.svg'
import MaximizeSVG from '@svg/maximize.svg'
import MinimizeSVG from '@svg/minimize.svg'
import PauseSVG from '@svg/pause.svg'
import PlaySVG from '@svg/play.svg'
import RewindSVG from '@svg/rewind.svg'
import SkipBackSVG from '@svg/skip-back.svg'
import SkipForwardSVG from '@svg/skip-forward.svg'
import SquareSVG from '@svg/square.svg'
import XSVG from '@svg/x.svg'
import type { ActionsProps } from './types'

const skipTimes = ['5', '10', '20', '30', '45', '60']

function Actions ({
  setSkipTime,
  skipTime,
  status,
  updateStatus,
  vlc,
}: ActionsProps): React.JSX.Element {
  const { lsStoreSkipTime } = useLS()
  const { updatePlaylist } = useApp()

  const updateSkipTime = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const seconds = e.target.value
      setSkipTime(seconds)
      lsStoreSkipTime?.(seconds)
    },
    [lsStoreSkipTime, setSkipTime],
  )

  const playIcon = {
    stopped: <SquareSVG />,
    paused: <PlaySVG />,
    playing: <PauseSVG />,
  }[status?.state ?? 'stopped']

  return (
    <div className="controls__actions">
      <select className="skipT" onChange={updateSkipTime} value={skipTime}>
        {skipTimes.map((v, i) => (
          <option key={i} value={v}>
            {v} s
          </option>
        ))}
      </select>
      <button
        className="skipB"
        title="Skip backwards"
        onClick={() => { void vlc.seek('-' + skipTime).then(updateStatus) }}
      >
        <RewindSVG />
      </button>
      <button
        className="skipF"
        title="Skip forward"
        onClick={() => { void vlc.seek('+' + skipTime).then(updateStatus) }}
      >
        <FastForwardSVG />
      </button>

      <button
        className="clear"
        title="Clear playlist"
        onClick={() => { void vlc.clearPlaylist().then(updateStatus) }}
      >
        <XSVG />
      </button>

      <button
        className={cx('fulls', { '--active': status?.options.fullscreen })}
        title="Fullscreen"
        onClick={() => { void vlc.fullscreen().then(updateStatus) }}
      >
        {status?.options.fullscreen != null ? <MinimizeSVG /> : <MaximizeSVG />}
      </button>

      <button
        className="prev"
        title="Previous"
        onClick={() => { void vlc.prev().then(updateStatus).then(updatePlaylist) }}
      >
        <SkipBackSVG />
      </button>

      <button
        className="next"
        title="Next"
        onClick={() => { void vlc.next().then(updateStatus).then(updatePlaylist) }}>
        <SkipForwardSVG />
      </button>

      <button
        className="play"
        title="Toggle play"
        onClick={() => { void vlc.togglePause().then(updateStatus) }}>
        {playIcon}
      </button>
    </div>
  )
}

export default Actions
