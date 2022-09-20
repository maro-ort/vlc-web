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
