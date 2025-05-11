import type { PlaylistItem } from '@types'

export interface PlaylistItemProps {
  item: PlaylistItem
  playItem: (id: string) => Promise<void>
  removeItem: (id: string) => Promise<void>
}
