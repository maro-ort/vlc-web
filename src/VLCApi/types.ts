import type { BrowserItem, PlaylistItem, VLCState } from '@types'

export interface ResponseBrowserDir {
  element: ResponseBrowserDirSingleItem[]
}

export interface ResponseBrowserDirSingleItem extends BrowserItem {
  access_time: EpochTimeStamp
  creation_time: EpochTimeStamp
  modification_time: EpochTimeStamp
  gid: number
  mode: number
  uid: number
}

export interface ResponsePlaylist {
  id: string
  name: string
  children: [
    {
      id: string
      name: string
      children: PlaylistItem[]
    }
  ]
}

export interface ResponseStatus {
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
