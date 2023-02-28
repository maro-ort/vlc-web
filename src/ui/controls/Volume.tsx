import { FC, useCallback } from 'react'

import Slider from '@ui/common/Slider'

import { ReactComponent as MuteSVG } from '@svg/volume-x.svg'
import { ReactComponent as VolumeMinSVG } from '@svg/volume.svg'
import { ReactComponent as VolumeLowSVG } from '@svg/volume-1.svg'
import { ReactComponent as VolumeHighSVG } from '@svg/volume-2.svg'

const CEILING = 384 // 256 -> 100%, 384 -> 150%

const Volume: FC<{ vol: number; setVol: (val: string) => void }> = ({ vol, setVol }) => {
  const volumeIcon = useCallback(() => {
    const pos = (CEILING * vol) / 100
    if (pos === 0) return <MuteSVG />
    else if (pos < 10) return <VolumeMinSVG />
    else if (pos < 60) return <VolumeLowSVG />
    else return <VolumeHighSVG />
  }, [vol])

  return (
    <div id="volume">
      <output>{Math.round((vol * 100) / 256).toFixed()}%</output>
      {volumeIcon()}
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
