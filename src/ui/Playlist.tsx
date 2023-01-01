import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import cx from 'classnames'

import { AppCtx } from '@src/App'

const Playlist: FC<{}> = () => {
  const { vlc } = useContext(AppCtx)
  const [currentPlaylist, setCurrentPlaylist] = useState<PlaylistItem[]>([])

  const updateStatus = useCallback(() => {
    vlc.playlist.fetch().then(setCurrentPlaylist)
  }, [vlc])

  useEffect(() => {
    const updateStatusInterval = setInterval(updateStatus, 1000)
    return () => clearInterval(updateStatusInterval)
  }, [updateStatus])

  return (
    <section id="playlist">
      <div className="playlist__items">
        {currentPlaylist.map(i => (
          <div
            key={i.id}
            className={cx('playlist__item', { '--current': !!i.current })}
            onClick={() => vlc.playlist.play(i.id)}
          >
            {i.name}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Playlist
