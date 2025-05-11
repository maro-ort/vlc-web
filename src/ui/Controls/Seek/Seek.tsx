import Slider from '@ui/shared/Slider/Slider'
import secondsToTime from '@utils/secondsToTime'
import type { SeekProps } from './types'

export default function Seek ({ seek, time }: SeekProps): React.JSX.Element {
  return (
    <div id="seek">
      <div className="seek__time">
        <div>{secondsToTime(time?.current)}</div>
        <div>{secondsToTime(time?.length)}</div>
      </div>
      <Slider
        onChange={(pos: number) => {
          if (pos !== 0) return
          seek(pos.toFixed(2) + '%')
        }}
        value={time?.current ?? 0}
        max={time?.length ?? 0}
      />
    </div>
  )
}
