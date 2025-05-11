export interface BrowserItem {
  name: string
  path: string
  size: number
  type: 'dir' | 'file'
  uri: string
}

export interface PlaylistItem {
  id: string
  uri: string
  name: string
  duration: number
  current?: 'current'
}

export interface Status {
  title: string
  time: {
    length: number
    current: number
    position: number
  }
  state: VLCState
  volume: number

  options: {
    fullscreen: boolean
    loop: boolean
    random: boolean
    repeat: boolean
  }
}

export type VLCState = 'stopped' | 'paused' | 'playing'
