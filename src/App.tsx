import CtxWrapper from './ctx/CtxWrapper'
import FileBrowser from '@ui/FileBrowser/FileBrowser'
import Playlist from '@ui/Playlist/Playlist'
import './scss/main.scss'

function App (): React.JSX.Element {
  return (
    <CtxWrapper>
      <section id="drawer">
        <Playlist />
        <FileBrowser />
      </section>
    </CtxWrapper>
  )
}

export default App
