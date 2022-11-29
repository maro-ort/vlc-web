import { FC, useCallback, useState } from 'react'
import cx from 'classnames'

import VLC, { Controls } from '@src/vlc'

const skipTimes = ['5', '10', '20', '30', '45', '60']

const Actions: FC<{
  controls: Controls
  status?: Status
}> = ({ controls, status }) => {
  const [skipTime, setSkipTime] = useState(skipTimes[0])

  const updateSkipTime = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const seconds = e.target.value
      setSkipTime(seconds)
    },
    [setSkipTime]
  )
  return (
    <div className="controls__actions">
      <select className="skipT" onChange={updateSkipTime} value={skipTime}>
        {skipTimes.map((v, i) => (
          <option key={i} value={v}>
            {v}s
          </option>
        ))}
      </select>
      <button className="skipB" onClick={() => controls.seek('-' + skipTime)}>
        ⏪︎
      </button>
      <button className="skipF" onClick={() => controls.seek('+' + skipTime)}>
        ⏩︎
      </button>

      <button className="settg">7</button>
      <button className={cx('fulls', { '--active': status?.options.fullscreen })} onClick={controls.fullscreen}>
        f
      </button>

      <button className="prev" onClick={controls.prev}>
        ⏮︎
      </button>
      <button className="next" onClick={controls.next}>
        ⏭︎
      </button>

      <button className="play" onClick={controls.togglePause}>
        ⏯︎
      </button>
    </div>
  )
}

export default Actions
