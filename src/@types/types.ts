export interface BrowserItem {
  name: string
  path: string
  size: number
  type: 'dir' | 'file'
  uri: string
}

export interface PlaylistItem {
  current?: 'current'
  duration: number
  id: string
  name: string
  uri: string
}

export interface Status {
  state: VLCState
  title: string
  volume: number
  time: {
    length: number
    current: number
    position: number
  }

  options: {
    fullscreen: boolean
    loop: boolean
    random: boolean
    repeat: boolean
  }
}

export type VLCState = 'stopped' | 'paused' | 'playing'
