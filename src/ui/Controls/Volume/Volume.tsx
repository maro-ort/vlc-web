import { useCallback } from 'react'
import Slider from '@ui/shared/Slider/Slider'
import MuteSVG from '@svg/volume-x.svg'
import VolumeMinSVG from '@svg/volume.svg'
import VolumeLowSVG from '@svg/volume-1.svg'
import VolumeHighSVG from '@svg/volume-2.svg'
import type { VolumeProps } from './types'

const CEILING = 384 // 256 -> 100%, 384 -> 150%

function Volume ({ vol, setVol }: VolumeProps): React.JSX.Element {
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
        max={CEILING}
        value={vol}
        onChange={(pos: number) => {
          if (pos !== 0) return
          setVol(((CEILING * pos) / 100).toFixed(0))
        }}
      />
    </div>
  )
}

export default Volume
