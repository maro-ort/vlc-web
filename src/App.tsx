import CtxWrapper from './ctx/CtxWrapper'
import Playlist from '@ui/Playlist/Playlist'
import './scss/main.scss'

function App (): React.JSX.Element {
  return (
    <CtxWrapper>
      <section id="drawer">
        <Playlist />
      </section>
    </CtxWrapper>
  )
}

export default App
