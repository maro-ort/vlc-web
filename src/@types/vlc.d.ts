interface BrowserItem {
  name: string
  path: string
  size: number
  type: 'dir' | 'file'
  uri: string
}

interface PlaylistItem {
  id: string
  uri: string
  name: string
  duration: number
}

interface PlaylistSource {
  id: string
  name: string
  children: PlaylistItem[]
}

interface Status {
  title: string
  time: {
    length: number
    current: time
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

type VLCState = 'stopped' | 'paused' | 'playing'

/**
 * DTO
 */

interface ResponseBrowserDir {
  element: ResponseBrowserDirSingleItem[]
}

interface ResponseBrowserDirSingleItem extends BrowserItem {
  access_time: EpochTimeStamp
  creation_time: EpochTimeStamp
  modification_time: EpochTimeStamp
  gid: number
  mode: number
  uid: number
}

interface ResponseStatus {
  volume: number
  state: VLCState
  position: number
  length: number
  time: number
  fullscreen: boolean
  loop: boolean
  random: boolean
  repeat: boolean
  information?: {
    category: {
      meta: {
        filename: string
        title: string
        seasonNumber: string
        episodeNumber: string
        showName: string
      }
    }
  }
}
