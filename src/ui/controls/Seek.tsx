import { seconds2Time } from '@src/utils/seconds2time'
import { FC } from 'react'
import Slider from '../common/Slider'

const Seek: FC<{ seek: (pos: string) => void; time?: Status['time'] }> = ({ seek, time }) => {
  return (
    <div id="seek">
      <div className="seek__time">
        <div>{seconds2Time(time?.current)}</div>
        <div>{seconds2Time(time?.length)}</div>
      </div>
      <Slider
        onChange={(pos: number) => {
          if (!pos) return
          seek(pos.toFixed(2) + '%')
        }}
        value={time?.current || 0}
        max={time?.length || 0}
      />
    </div>
  )
}

export default Seek
