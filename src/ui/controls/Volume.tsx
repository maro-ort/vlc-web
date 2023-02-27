import { FC } from 'react'

import Slider from '@ui/common/Slider'

const CEILING = 384 // 256 -> 100%, 384 -> 150%

const Volume: FC<{ vol: number; setVol: (val: string) => void }> = ({ vol, setVol }) => {
  // console.log({ vol })

  // const updateVol = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.target
  //   setVol(value)
  // }

  return (
    <div id="volume">
      <output>{Math.round((vol * 100) / 256).toFixed()}%</output>
      <div>{vol === 0 ? '🔇' : '🔊'}</div>{' '}
      <Slider
        onChange={(pos: number) => {
          if (!pos) return
          setVol(((CEILING * pos) / 100).toFixed(0))
        }}
        value={vol}
        max={CEILING}
      />
    </div>
  )
}

export default Volume
