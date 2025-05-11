import type { BrowserItem, PlaylistItem, Status } from '@types'
import type {
  ResponseBrowserDir,
  ResponsePlaylist,
  ResponseStatus,
} from './types'

const HOST: string = process.env.NODE_ENV === 'development'
  ? import.meta.env.VITE_VLC_HOST
  : ''

export default class VLCApi {
  private readonly password

  constructor (password: string) {
    this.password = password
  }

  async sendCommand<T> (params: Record<string, string> = {}, path = 'status'): Promise<T> {
    const query = Object.entries(params)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&')

    return await fetch(`${HOST}/requests/${path}.json?${query}`, {
      headers: {
        Authorization: `Basic ${btoa(`:${this.password}`)}`,
      },
    }).then(response => {
      if (!response.ok) throw new Error(response.status.toFixed())
      return response
    }).then(async response => await response.json() as T)
  }

  async status (): Promise<Status> {
    return await this.sendCommand<ResponseStatus>()
      .then(response => {
        const {
          fullscreen,
          information,
          length,
          loop,
          position,
          random,
          repeat,
          state,
          time,
          volume,
        } = response
        const { meta } = information?.category ?? {}
        const title = meta?.title ?? meta?.filename ?? 'Unknown'
        return {
          state,
          title,
          volume,
          time: {
            current: time,
            length,
            position,
          },

          options: {
            fullscreen,
            loop,
            random,
            repeat,
          },
        }
      })
  }

  /**
   * Playlist
   */
  async dir (uri: string): Promise<BrowserItem[]> {
    return await this.sendCommand<ResponseBrowserDir>({ dir: uri }, 'browse')
      .then(({ element }) => element)
  }

  async clearPlaylist (): Promise<ResponseStatus> {
    return await this.sendCommand({ command: 'pl_empty' })
  }

  async removeItem (id: string): Promise<ResponseStatus> {
    return await this.sendCommand({ command: 'pl_delete', id })
  }

  async fetchPlaylist (): Promise<PlaylistItem[]> {
    return await this.sendCommand<ResponsePlaylist>({}, 'playlist')
      .then(({ children }) => {
        const playlistSource = children.find(({ name }) => name === 'Playlist')
        if (playlistSource == null) throw new Error('Playlist not found')
        return playlistSource.children
      })
  }

  async queue (uri: string | string[]): Promise<void> {
    if (typeof uri === 'string') uri = [uri]
    for (const input of uri) await this.sendCommand({ command: 'in_enqueue', input })
  }

  /**
   * Controls
   */
  async loop (): Promise<ResponseStatus> {
    return await this.sendCommand({ command: 'pl_loop' })
  }

  async fullscreen (): Promise<ResponseStatus> {
    return await this.sendCommand({ command: 'fullscreen' })
  }

  async next (): Promise<ResponseStatus> {
    return await this.sendCommand({ command: 'pl_next' })
  }

  async playItem (id: string): Promise<ResponseStatus> {
    return await this.sendCommand({ command: 'pl_play', id })
  }

  async prev (): Promise<ResponseStatus> {
    return await this.sendCommand({ command: 'pl_previous' })
  }

  async random (): Promise<ResponseStatus> {
    return await this.sendCommand({ command: 'pl_random' })
  }

  async repeat (): Promise<ResponseStatus> {
    return await this.sendCommand({ command: 'pl_repeat' })
  }

  async volume (val: string): Promise<ResponseStatus> {
    return await this.sendCommand({ command: 'volume', val })
  }

  async seek (val: string): Promise<ResponseStatus> {
    return await this.sendCommand({ command: 'seek', val })
  }

  async stop (): Promise<ResponseStatus> {
    return await this.sendCommand({ command: 'pl_stop' })
  }

  async togglePause (): Promise<ResponseStatus> {
    return await this.sendCommand({ command: 'pl_pause' })
  }
}
