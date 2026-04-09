import type { BrowserItem, PlaylistItem, VLCState } from '@types'

export interface ResponseBrowserDir {
  element: ResponseBrowserDirSingleItem[]
}

export interface ResponseBrowserDirSingleItem extends BrowserItem {
  access_time: EpochTimeStamp
  creation_time: EpochTimeStamp
  gid: number
  mode: number
  modification_time: EpochTimeStamp
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
    },
  ]
}

export interface ResponseStatus {
  fullscreen: boolean
  length: number
  loop: boolean
  position: number
  random: boolean
  repeat: boolean
  state: VLCState
  time: number
  volume: number
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
