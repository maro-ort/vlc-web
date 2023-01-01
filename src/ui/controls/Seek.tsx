import { FC } from 'react'
import Slider from '../common/Slider'

const Seek: FC<{ seek: (pos: string) => void; time?: Status['time'] }> = ({ seek, time }) => {
  return (
    <div id="seek">
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
