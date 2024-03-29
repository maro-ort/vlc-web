import React, { FC, useCallback, useContext } from 'react'
import cx from 'classnames'

import AppCtx from '@ctx/app.ctx'

import { seconds2Time } from '@src/utils/seconds2time'

import { ReactComponent as XSVG } from '@svg/x.svg'

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
        <XSVG />
      </button>
    </div>
  )
}

const Playlist: FC<{}> = () => {
  const { vlc, currentPlaylist, updatePlaylist } = useContext(AppCtx)

  const playItem = useCallback((id: string) => vlc?.playItem(id).then(updatePlaylist), [updatePlaylist, vlc])

  const removeItem = useCallback((id: string) => vlc?.removeItem(id).then(updatePlaylist), [updatePlaylist, vlc])

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
