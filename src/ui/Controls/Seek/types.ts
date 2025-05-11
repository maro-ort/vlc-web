import type { Status } from '@types'

export interface SeekProps {
  seek: (pos: string) => void
  time?: Status['time']
}
