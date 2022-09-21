import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import cx from 'classnames'

import { AppCtx } from './App'

import { ReactComponent as PlaySvg } from './svg/play.svg'

type ItemListType = {
  parent?: BrowserItem
  dirs: BrowserItem[]
  files: BrowserItem[]
}

const DirItem: FC<{
  file: BrowserItem
  browseTo: (path: string) => void
}> = ({ file, browseTo }) => {
  return (
    <>
      <td onClick={() => browseTo(file.path)} title={file.name}>
        
      </td>
      <td className="filebrowser__item-name" onClick={() => browseTo(file.path)} title={file.name}>
        {file.name}
      </td>
      <td>
        <button>
          <PlaySvg />
        </button>
      </td>
    </>
  )
}

const FileItem: FC<{
  file: BrowserItem
  selectedUris: string[]
  toggleSelectUri: (uri: string) => void
}> = ({ file, selectedUris, toggleSelectUri }) => {
  return (
    <>
      <td onClick={() => toggleSelectUri(file.uri)}>
        <input type="checkbox" value={file.uri} checked={selectedUris.includes(file.uri)} readOnly />
      </td>
      <td className="filebrowser__item-name" onClick={() => toggleSelectUri(file.uri)} title={file.name}>
        {file.name}
      </td>
      <td>
        <button>
          <PlaySvg />
        </button>
      </td>
    </>
  )
}

const FileBrowser: FC<{}> = () => {
  const { vlc } = useContext(AppCtx)
  const [allSelected, setAllSelected] = useState(false)
  const [path, setPath] = useState('/')
  const [itemList, setItemList] = useState<ItemListType>({
    dirs: [],
    files: [],
  })
  const [selectedUris, setSelectedUris] = useState<string[]>([])

  /**
   * File management
   */

  const browseTo = (path: string) => setPath(path)

  const updateFiles = useCallback(() => {
    void vlc.browser
      .fakeDir(path)
      .then(f => f.sort((a, b) => (a.type === b.type ? a.name.localeCompare(b.name) : a.type.localeCompare(b.type))))
      .then(f =>
        f.reduce(
          (acc, file) => {
            if (file.name === '..') acc.parent = file
            else if (file.type === 'dir') acc.dirs.push(file)
            else if (file.type === 'file') acc.files.push(file)
            return acc
          },
          { dirs: [], files: [] } as ItemListType
        )
      )
      .then(setItemList)
  }, [path, vlc.browser])

  useEffect(() => updateFiles, [updateFiles])

  /**
   * File selection
   */

  const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    if (checked) {
      setSelectedUris(itemList.files.map(({ uri }) => uri))
      setAllSelected(true)
    } else {
      setSelectedUris([])
      setAllSelected(false)
    }
  }

  const toggleSelectUri = useCallback(
    (uri: string) => {
      const checked = selectedUris.includes(uri)
      if (checked) setSelectedUris(selectedUris.filter(v => v !== uri))
      else setSelectedUris([...selectedUris, uri])
      setAllSelected(false)
    },
    [selectedUris]
  )

  return (
    <div id="filebrowser">
      <div className="filebrowser__actions">
        <input type="checkbox" onChange={toggleSelectAll} checked={allSelected} />
        <button onClick={() => vlc.playlist.queue(selectedUris)}>
          <PlaySvg />
        </button>
        <button onClick={() => itemList.parent && browseTo(itemList.parent.uri)}>↑</button>
      </div>
      <table className="filebrowser__items">
        <tbody>
          {itemList.dirs.map((file, i) => (
            <tr key={i} className={cx('filebrowser__item', file.type)}>
              <DirItem file={file} browseTo={browseTo} />
            </tr>
          ))}
          {itemList.files.map((file, i) => (
            <tr key={i} className={cx('filebrowser__item', file.type)}>
              <FileItem file={file} selectedUris={selectedUris} toggleSelectUri={toggleSelectUri} />
            </tr>
          ))}
        </tbody>
      </table>
      <pre style={{ width: '200px' }}>{JSON.stringify({ selectedUris }, null, 2)}</pre>
    </div>
  )
}

export default FileBrowser
