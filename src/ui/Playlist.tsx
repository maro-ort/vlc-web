import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import cx from 'classnames'

import { AppCtx } from '@src/App'

import { seconds2Time } from '@src/utils/seconds2time'

const Item: FC<{
  item: PlaylistItem
  playItem: (id: string) => void
  removeItem: (id: string) => void
}> = ({ item, playItem, removeItem }) => {
  return (
    <div key={item.id} className={cx('playlist__item', { '--current': !!item.current })}>
      <div className="playlist__item-name" onClick={() => playItem(item.id)}>
        <div>{item.name}</div>
        <div>{seconds2Time(item.duration)}</div>
      </div>
      <button title="Remove from playlist" onClick={() => removeItem(item.id)}>
        ✖
      </button>
    </div>
  )
}

const Playlist: FC<{}> = () => {
  const { vlc, currentPlaylist, updatePlaylist } = useContext(AppCtx)

  const playItem = useCallback((id: string) => vlc.playlist.play(id).then(updatePlaylist), [updatePlaylist, vlc])

  const removeItem = useCallback((id: string) => vlc.playlist.delete(id).then(updatePlaylist), [updatePlaylist, vlc])

  return (
    <section id="playlist">
      <div className="playlist__items">
        {currentPlaylist.map(i => (
          <Item key={i.id} item={i} playItem={playItem} removeItem={removeItem} />
        ))}
      </div>
    </section>
  )
}

export default Playlist
