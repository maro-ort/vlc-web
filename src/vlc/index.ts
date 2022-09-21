const sendCommand = async <T>(params: Record<string, string> = {}, path: string = 'status'): Promise<T> => {
  const query = new URLSearchParams(params)

  return await fetch(`/requests/${path}.json?${query.toString()}`, {
    headers: {
      Authorization: 'Basic ' + btoa(':pass'),
    },
  }).then(async r => await r.json())
}

class Browser {
  async dir(uri: string): Promise<BrowserItem[]> {
    return await sendCommand<ResponseBrowserDir>({ dir: uri }, 'browse').then(({ element }) => element)
  }

  async fakeDir(uri: string): Promise<BrowserItem[]> {
    const ResponseBrowserDirExample: ResponseBrowserDir = {
      element: [
        {
          access_time: 1658941568,
          modification_time: 1660071335,
          size: 4096,
          uid: 1000,
          gid: 1001,
          uri: 'file:///home/aumon/',
          path: '/home/aumon/downloads/..',
          name: '..',
          creation_time: 1660071335,
          type: 'dir',
          mode: 16840,
        },
        {
          access_time: 1660025972,
          modification_time: 1660026411,
          size: 2580263063,
          uid: 1000,
          gid: 1001,
          uri: 'file:///home/aumon/downloasds/movies/The%20Lord%20of%20the%20Rings%20The%20Fellowship%20of%20the%20Ring%20THEATRICAL%20EDITION%20%282001%29%20%5B1080p%5D/The.Lord.of.the.Rings.The.Fellowship.of.the.Rings.THEATRICAL.EDITION.2001.1080p.BrRip.x264.BOKUTOX.YIFY.mp4',
          path: '/home/aumon/downloads/movies/The Lord of the Rings The Fellowship of the Ring THEATRICAL EDITION (2001) [1080p]/The.Lord.of.the.Rings.The.Fellowship.of.the.Rings.THEATRICAL.EDITION.2001.1080p.BrRip.x264.BOKUTOX.YIFY.mp4',
          name: 'The.Lord.of.the.Rings.The.Fellowship.of.the.Rings.THEATRICAL.EDITION.2001.1080p.BrRip.x264.BOKUTOX.YIFY.mp4',
          creation_time: 1660026411,
          type: 'dir',
          mode: 33188,
        },
        {
          access_time: 1660025972,
          modification_time: 1660026411,
          size: 2580263063,
          uid: 1000,
          gid: 1001,
          uri: 'file:///home/aumon/dsownloads/movies/The%20Lord%20of%20the%20Rings%20The%20Fellowship%20of%20the%20Ring%20THEATRICAL%20EDITION%20%282001%29%20%5B1080p%5D/The.Lord.of.the.Rings.The.Fellowship.of.the.Rings.THEATRICAL.EDITION.2001.1080p.BrRip.x264.BOKUTOX.YIFY.mp4',
          path: '/home/aumon/downloads/movies/The Lord of the Rings The Fellowship of the Ring THEATRICAL EDITION (2001) [1080p]/The.Lord.of.the.Rings.The.Fellowship.of.the.Rings.THEATRICAL.EDITION.2001.1080p.BrRip.x264.BOKUTOX.YIFY.mp4',
          name: 'ellowship.of.the.Rings.THEATRICAL.EDITION.2001.1080p.BrRip.x264.BOKUTOX.YIFY.mp4',
          creation_time: 1660026411,
          type: 'dir',
          mode: 33188,
        },
        {
          access_time: 1660025972,
          modification_time: 1660026411,
          size: 2580263063,
          uid: 1000,
          gid: 1001,
          uri: 'file:///home/aumon/downloads/movsies/The%20Lord%20of%20the%20Rings%20The%20Fellowship%20of%20the%20Ring%20THEATRICAL%20EDITION%20%282001%29%20%5B1080p%5D/The.Lord.of.the.Rings.The.Fellowship.of.the.Rings.THEATRICAL.EDITION.2001.1080p.BrRip.x264.BOKUTOX.YIFY.mp4',
          path: '/home/aumon/downloads/movies/The Lord of the Rings The Fellowship of the Ring THEATRICAL EDITION (2001) [1080p]/The.Lord.of.the.Rings.The.Fellowship.of.the.Rings.THEATRICAL.EDITION.2001.1080p.BrRip.x264.BOKUTOX.YIFY.mp4',
          name: 'AAellowship.of.the.Rings.THEATRICAL.EDITION.2001.1080p.BrRip.x264.BOKUTOX.YIFY.mp4',
          creation_time: 1660026411,
          type: 'dir',
          mode: 33188,
        },
        {
          access_time: 1660025972,
          modification_time: 1660026411,
          size: 2580263063,
          uid: 1000,
          gid: 1001,
          uri: 'file:///home/aumon/downloads/maovies/The%20Lord%20of%20the%20Rings%20The%20Fellowship%20of%20the%20Ring%20THEATRICAL%20EDITION%20%282001%29%20%5B1080p%5D/The.Lord.of.the.Rings.The.Fellowship.of.the.Rings.THEATRICAL.EDITION.2001.1080p.BrRip.x264.BOKUTOX.YIFY.mp4',
          path: '/home/aumon/downloads/movies/The Lord of the Rings The Fellowship of the Ring THEATRICAL EDITION (2001) [1080p]/The.Lord.of.the.Rings.The.Fellowship.of.the.Rings.THEATRICAL.EDITION.2001.1080p.BrRip.x264.BOKUTOX.YIFY.mp4',
          name: 'ZZZellowship.of.the.Rings.THEATRICAL.EDITION.2001.1080p.BrRip.x264.BOKUTOX.YIFY.mp4',
          creation_time: 1660026411,
          type: 'dir',
          mode: 33188,
        },
        {
          access_time: 1660025972,
          modification_time: 1660026411,
          size: 2580263063,
          uid: 1000,
          gid: 1001,
          uri: 'file:///home/aumon/downloads/mdovies/The%20Lord%20of%20the%20Rings%20The%20Fellowship%20of%20the%20Ring%20THEATRICAL%20EDITION%20%282001%29%20%5B1080p%5D/The.Lord.of.the.Rings.The.Fellowship.of.the.Rings.THEATRICAL.EDITION.2001.1080p.BrRip.x264.BOKUTOX.YIFY.mp4',
          path: '/home/aumon/downloads/movies/The Lord of the Rings The Fellowship of the Ring THEATRICAL EDITION (2001) [1080p]/The.Lord.of.the.Rings.The.Fellowship.of.the.Rings.THEATRICAL.EDITION.2001.1080p.BrRip.x264.BOKUTOX.YIFY.mp4',
          name: 'ZThe.Lord.of.the.Rings.The.Fellowship.of.the.Rings.THEATRICAL.EDITION.2001.1080p.BrRip.x264.BOKUTOX.YIFY.mp4',
          creation_time: 1660026411,
          type: 'file',
          mode: 33188,
        },
        {
          access_time: 1660025972,
          modification_time: 1660026411,
          size: 2580263063,
          uid: 1000,
          gid: 1001,
          uri: 'file:///home/aumon/downloads/mouvies/The%20Lord%20of%20the%20Rings%20The%20Fellowship%20of%20the%20Ring%20THEATRICAL%20EDITION%20%282001%29%20%5B1080p%5D/The.Lord.of.the.Rings.The.Fellowship.of.the.Rings.THEATRICAL.EDITION.2001.1080p.BrRip.x264.BOKUTOX.YIFY.mp4',
          path: '/home/aumon/downloads/movies/The Lord of the Rings The Fellowship of the Ring THEATRICAL EDITION (2001) [1080p]/The.Lord.of.the.Rings.The.Fellowship.of.the.Rings.THEATRICAL.EDITION.2001.1080p.BrRip.x264.BOKUTOX.YIFY.mp4',
          name: 'Zof.the.Rings.The.Fellowship.of.the.Rings.THEATRICAL.EDITION.2001.1080p.BrRip.x264.BOKUTOX.YIFY.mp4',
          creation_time: 1660026411,
          type: 'file',
          mode: 33188,
        },
        {
          access_time: 1660025972,
          modification_time: 1660026411,
          size: 2580263063,
          uid: 1000,
          gid: 1001,
          uri: 'file:///home/aumon/downloads/movieys/The%20Lord%20of%20the%20Rings%20The%20Fellowship%20of%20the%20Ring%20THEATRICAL%20EDITION%20%282001%29%20%5B1080p%5D/The.Lord.of.the.Rings.The.Fellowship.of.the.Rings.THEATRICAL.EDITION.2001.1080p.BrRip.x264.BOKUTOX.YIFY.mp4',
          path: '/home/aumon/downloads/movies/The Lord of the Rings The Fellowship of the Ring THEATRICAL EDITION (2001) [1080p]/The.Lord.of.the.Rings.The.Fellowship.of.the.Rings.THEATRICAL.EDITION.2001.1080p.BrRip.x264.BOKUTOX.YIFY.mp4',
          name: 'Ze.Fellowship.of.the.Rings.THEATRICAL.EDITION.2001.1080p.BrRip.x264.BOKUTOX.YIFY.mp4',
          creation_time: 1660026411,
          type: 'file',
          mode: 33188,
        },
      ],
    }
    return await Promise.resolve(ResponseBrowserDirExample.element)
    //.then(({ elements }))
  }
}

class Controls {
  loop(): void {
    void sendCommand({ command: 'pl_loop' })
  }

  fullscreen(): void {
    void sendCommand({ command: 'fullscreen' })
  }

  next(): void {
    void sendCommand({ command: 'pl_stop' })
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
    if (/^((\+|-)?\d+|\d+%?)$/.test(val)) throw new Error(`Invalid value for volume: ${val}`)
    void sendCommand({ command: 'volume', val })
  }

  seek(val: string): void {
    if (/^((\+|-)?\d+|\d+%?)$/.test(val)) throw new Error(`Invalid value for seek: ${val}`)
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
  clear(): void {
    void sendCommand({ command: 'pl_empty' })
  }

  delete(id: string): void {
    void sendCommand({ command: 'pl_delete', id })
  }

  async fetch(): Promise<PlaylistItem[]> {
    return await sendCommand<any>({}, 'playlist').then(({ children }: { children: PlaylistSource[] }) => {
      const playlistSource = children.find(({ name }) => name === 'Playlist')
      if (playlistSource == null) throw new Error('Playlist not found')
      return playlistSource.children
    })
  }

  queue(uri: string): void {
    void sendCommand({ command: 'in_enqueue', input: uri })
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

  async status(): Promise<void> {
    return await sendCommand().then(r => {
      console.log({ r })
    })
  }
}
