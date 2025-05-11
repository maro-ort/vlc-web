import React, { useCallback } from 'react'
import cx from 'classnames'
import { useApp } from '@ctx'
import secondsToTime from '@utils/secondsToTime'
import XSVG from '@svg/x.svg'
import type { PlaylistItemProps } from './types'

function Item ({ item, playItem, removeItem }: PlaylistItemProps): React.JSX.Element {
  return (
    <div
      key={item.id}
      className={cx(
        'playlist__item',
        { '--current': item.current === 'current' },
      )}
    >
      <div
        className="playlist__item-name"
        onClick={() => { void playItem(item.id) }}
      >
        <div>{item.name}</div>
        <div>{secondsToTime(item.duration)}</div>
      </div>
      <button
        title="Remove from playlist"
        onClick={() => { void removeItem(item.id) }}
      >
        <XSVG />
      </button>
    </div>
  )
}

function Playlist (): React.JSX.Element {
  const { vlc, currentPlaylist, updatePlaylist } = useApp()

  const playItem = useCallback(async (id: string) => {
    return await vlc?.playItem(id).then(updatePlaylist)
  }, [updatePlaylist, vlc])

  const removeItem = useCallback(async (id: string) => {
    await vlc?.removeItem(id).then(updatePlaylist)
  }, [updatePlaylist, vlc])

  return (
    <section id="playlist">
      <div className="playlist__items">
        {currentPlaylist.map(i => (
          <Item
            key={i.id}
            item={i}
            playItem={playItem}
            removeItem={removeItem}
          />
        ))}
      </div>
    </section>
  )
}

export default Playlist
