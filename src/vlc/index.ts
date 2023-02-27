import { browseData } from '@src/data/browse.data'

const HOST = process.env.REACT_APP_VLC_HOST
const PASSWORD = process.env.REACT_APP_VLC_PSSWD

const sendCommand = async <T>(params: Record<string, string> = {}, path: string = 'status'): Promise<T> => {
  const query = Object.entries(params)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')

  return await fetch(`${HOST}/requests/${path}.json?${query}`, {
    headers: {
      Authorization: 'Basic ' + btoa(`:${PASSWORD}`),
    },
  }).then(r => r.json())
}

class Browser {
  async dir(uri: string): Promise<BrowserItem[]> {
    // return this.fakeDir(uri)
    return await sendCommand<ResponseBrowserDir>({ dir: uri }, 'browse').then(({ element }) => element)
  }

  async fakeDir(uri: string): Promise<BrowserItem[]> {
    const ResponseBrowserDirExample: ResponseBrowserDir = browseData[uri]
    return await Promise.resolve(ResponseBrowserDirExample.element)
    //.then(({ elements }))
  }
}

export class Controls {
  enqueueFile(uri: string): Promise<ResponseStatus> {
    return sendCommand<ResponseStatus>({ command: 'in_enqueue', input: uri })
  }

  loop(): void {
    void sendCommand({ command: 'pl_loop' })
  }

  fullscreen(): void {
    void sendCommand({ command: 'fullscreen' })
  }

  next(): void {
    void sendCommand({ command: 'pl_next' })
  }

  playFile(uri: string): void {
    void sendCommand({ command: 'in_play', input: uri })
  }

  playItem(id: string): void {
    void sendCommand({ command: 'pl_play', id })
  }

  prev(): void {
    void sendCommand({ command: 'pl_previous' })
  }

  random(): void {
    void sendCommand({ command: 'pl_random' })
  }

  repeat(): void {
    void sendCommand({ command: 'pl_repeat' })
  }

  volume(val: string): void {
    // /^((\+|-)?\d+|\d+%?)$/ tests for ±vol or vol%
    // if (!/^((\+|-)?\d+|\d+%?)$/.test(val)) throw new Error(`Invalid value for volume: ${val}`)
    void sendCommand({ command: 'volume', val })
  }

  seek(val: string): void {
    // if (!/^((\+|-)?\d+|\d+%?)$/.test(val)) throw new Error(`Invalid value for seek: ${val}`)
    void sendCommand({ command: 'seek', val })
  }

  stop(): void {
    void sendCommand({ command: 'pl_stop' })
  }

  togglePause(): void {
    void sendCommand({ command: 'pl_pause' })
  }
}

class Playlist {
  private readonly items: PlaylistItem[] = []

  getItems(): PlaylistItem[] {
    return [...this.items]
  }

  /**
   * Commands
   */
  clear(): Promise<ResponseStatus> {
    return sendCommand({ command: 'pl_empty' })
  }

  delete(id: string): Promise<ResponseStatus> {
    return sendCommand({ command: 'pl_delete', id })
  }

  play(id: string): Promise<ResponseStatus> {
    return sendCommand({ command: 'pl_play', id })
  }

  async fetch(): Promise<PlaylistItem[]> {
    return await sendCommand<any>({}, 'playlist').then(({ children }: { children: PlaylistSource[] }) => {
      const playlistSource = children.find(({ name }) => name === 'Playlist')
      if (playlistSource == null) throw new Error('Playlist not found')
      return playlistSource.children
    })
  }

  async queue(uri: string | string[]): Promise<void> {
    if (typeof uri === 'string') uri = [uri]
    for (const input of uri) await sendCommand({ command: 'in_enqueue', input })
  }
}

export default class VLC {
  public readonly browser
  public readonly controls
  public readonly playlist

  constructor() {
    this.browser = new Browser()
    this.controls = new Controls()
    this.playlist = new Playlist()
  }

  async status(): Promise<Status> {
    return await sendCommand().then(r => {
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
}
