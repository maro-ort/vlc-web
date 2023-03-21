const HOST = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_VLC_HOST : ''

export default class VLC {
  private readonly password

  constructor(password: string) {
    this.password = password
  }

  sendCommand<T>(params: Record<string, string> = {}, path: string = 'status'): Promise<T> {
    const query = Object.entries(params)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&')

    return fetch(`${HOST}/requests/${path}.json?${query}`, {
      headers: {
        Authorization: 'Basic ' + btoa(`:${this.password}`),
      },
    })
      .then(r => {
        if (!r.ok) throw new Error(r.status.toFixed())
        return r
      })
      .then(r => r.json())
  }

  status(): Promise<Status> {
    return this.sendCommand().then(r => {
      const { length, time, position, state, volume, information, fullscreen, loop, random, repeat } =
        r as ResponseStatus
      const { meta } = information?.category || {}
      const title = meta?.title || meta?.filename || 'Unknown'
      return {
        title,
        time: {
          length,
          current: time,
          position,
        },
        state,
        volume,

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
  dir(uri: string): Promise<BrowserItem[]> {
    return this.sendCommand<ResponseBrowserDir>({ dir: uri }, 'browse').then(({ element }) => element)
  }

  clearPlaylist(): Promise<ResponseStatus> {
    return this.sendCommand({ command: 'pl_empty' })
  }

  removeItem(id: string): Promise<ResponseStatus> {
    return this.sendCommand({ command: 'pl_delete', id })
  }

  fetchPlaylist(): Promise<PlaylistItem[]> {
    return this.sendCommand<ResponsePlaylist>({}, 'playlist').then(({ children }) => {
      const playlistSource = children.find(({ name }) => name === 'Playlist')
      if (playlistSource == null) throw new Error('Playlist not found')
      return playlistSource.children
    })
  }

  async queue(uri: string | string[]): Promise<void> {
    if (typeof uri === 'string') uri = [uri]
    for (const input of uri) await this.sendCommand({ command: 'in_enqueue', input })
  }

  /**
   * Controls
   */
  loop(): Promise<ResponseStatus> {
    return this.sendCommand({ command: 'pl_loop' })
  }

  fullscreen(): Promise<ResponseStatus> {
    return this.sendCommand({ command: 'fullscreen' })
  }

  next(): Promise<ResponseStatus> {
    return this.sendCommand({ command: 'pl_next' })
  }

  playItem(id: string): Promise<ResponseStatus> {
    return this.sendCommand({ command: 'pl_play', id })
  }

  prev(): Promise<ResponseStatus> {
    return this.sendCommand({ command: 'pl_previous' })
  }

  random(): Promise<ResponseStatus> {
    return this.sendCommand({ command: 'pl_random' })
  }

  repeat(): Promise<ResponseStatus> {
    return this.sendCommand({ command: 'pl_repeat' })
  }

  volume(val: string): Promise<ResponseStatus> {
    // /^((\+|-)?\d+|\d+%?)$/ tests for ±vol or vol%
    // if (!/^((\+|-)?\d+|\d+%?)$/.test(val)) throw new Error(`Invalid value for volume: ${val}`)
    return this.sendCommand({ command: 'volume', val })
  }

  seek(val: string): Promise<ResponseStatus> {
    // if (!/^((\+|-)?\d+|\d+%?)$/.test(val)) throw new Error(`Invalid value for seek: ${val}`)
    return this.sendCommand({ command: 'seek', val })
  }

  stop(): Promise<ResponseStatus> {
    return this.sendCommand({ command: 'pl_stop' })
  }

  togglePause(): Promise<ResponseStatus> {
    return this.sendCommand({ command: 'pl_pause' })
  }
}
