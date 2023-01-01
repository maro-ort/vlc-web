import React, { FC, useCallback, useEffect, useState } from 'react'

const Slider: FC<{
  onChange: (track: number) => void
  value: number
  max?: number
}> = ({ onChange, value, max }) => {
  const [track, setTrack] = useState((value * 100) / (max || 100))

  const [isDragging, setIsDragging] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    const rect = target.getBoundingClientRect()
    const newX = ((e.clientX - rect.left) * 100) / rect.width
    setTrack(newX)
    onChange(newX)
  }

  const handleDrag = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      if (!isDragging) return
      const target = e.currentTarget
      const rect = target.getBoundingClientRect()
      const x = 'clientX' in e ? e.clientX : e.touches[0].clientX
      const newX = Math.min(100, Math.max(0, ((x - rect.left) * 100) / rect.width))
      setTrack(newX)
      onChange(newX)
    },
    [isDragging, onChange]
  )

  useEffect(() => {
    setTrack((value * 100) / (max || 100))
  }, [max, value])

  return (
    <div
      className="slider"
      onClick={handleClick}
      onMouseMove={handleDrag}
      onTouchMove={handleDrag}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      onTouchCancel={() => setIsDragging(false)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
    >
      <div className="slider__path">
        <div className="slider__track" style={{ width: `${track}%` }} />
      </div>
      <div className="slider__thumb" style={{ left: `${track}%` }} />
    </div>
  )
}

export default Slider
