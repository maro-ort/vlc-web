import { FC } from 'react'

const Seek: FC<{ seek: (pos: string) => void; time?: Status['time'] }> = ({ seek, time }) => {
  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    seek(value + '%')
  }

  return (
    <div id="seek">
      <input
        className="controls__seek"
        onChange={onSeek}
        type="range"
        value={time?.current || 0}
        min={0}
        max={time?.length || 0}
        title="Ha"
      />
    </div>
  )
  // value={`${(status?.time.position || 0) * 100}%`}
}

export default Seek
