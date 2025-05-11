import type { PlaylistItem } from '@types'
import type VLCApi from '@vlc'

export interface AppContext {
  currentPlaylist: PlaylistItem[]
  updatePlaylist: () => void
  vlc?: VLCApi
}
