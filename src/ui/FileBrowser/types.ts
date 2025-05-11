import type { BrowserItem } from '@types'

export interface BreadcrumbsProps {
  browseTo: (path: string) => void
  path: string
}

export interface DirInfo {
  dirs: number
  files: number
}
export interface DirItemProps {
  browseTo: () => void
  file: BrowserItem
  getDirInfo: (path: string) => Promise<DirInfo | null>
}

export interface FileItemProps {
  addToPlaylist: (item: BrowserItem) => Promise<void>
  file: BrowserItem
}

export interface ItemList {
  parent?: BrowserItem
  dirs: BrowserItem[]
  files: BrowserItem[]
}
