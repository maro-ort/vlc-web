import React, { FC } from 'react'

const Playlist: FC<{}> = () => {
  return (
    <section id="playlist">
      {[...Array(60)].map((v, i) => (
        <div key={i} style={{ minWidth: '300px', height: '3em', border: '1px solid black' }}>
          {i}
        </div>
      ))}
    </section>
  )
}

export default Playlist
