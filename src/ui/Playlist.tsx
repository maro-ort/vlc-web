import React, { FC } from 'react'

const Playlist: FC<{}> = () => {
  return (
    <section id="playlist">
      {[...Array(60)].map((v, i) => (
        <div key={i}>{i}</div>
      ))}
    </section>
  )
}

export default Playlist
