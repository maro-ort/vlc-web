import React, { FC } from 'react'

const Playlist: FC<{}> = () => {
  return (
    <section id="playlist">
      <div className="playlist__items">
        {[...Array(60)].map((v, i) => (
          <div key={i}>{i}</div>
        ))}
      </div>
    </section>
  )
}

export default Playlist
