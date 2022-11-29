import { FC } from 'react'

const CEILING = 384 // 256 -> 100%, 384 -> 150%

const Volume: FC<{ vol: number; setVol: (val: string) => void }> = ({ vol, setVol }) => {
  // console.log({ vol })

  const updateVol = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setVol(value)
  }

  return (
    <div id="volume">
      <output>{Math.round((vol * 100) / 256).toFixed()}%</output>
      <div>{vol === 0 ? '🔇' : '🔊'}</div>
      <input type="range" max={CEILING} value={vol} onChange={updateVol} />
    </div>
  )
}

export default Volume
