import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import cx from 'classnames'

import { AppCtx } from '@src/App'

import { pathDecorator } from '@vlc/utils/path.decorator'

import { ReactComponent as PlaySvg } from '@svg/play.svg'

type ItemListType = {
  parent?: BrowserItem
  dirs: BrowserItem[]
  files: BrowserItem[]
}

const Path: FC<{ path: string }> = ({ path }) => {
  const tree = path.split('/')
  const current = tree.pop() // NOTE: tree has mutated

  return (
    <div className="filebroweser__path">
      <div className="filebrowser__parents">{pathDecorator(tree.join('/'))}</div>
      <div className="filebrowser__current">{current}</div>
    </div>
  )
}

const DirItem: FC<{
  file: BrowserItem
  browseTo: () => void
}> = ({ file, browseTo }) => {
  return (
    <>
      <td className="filebrowser__item-name" onClick={browseTo} title={file.name}>
        {file.name}
      </td>
      <td onClick={browseTo} title={file.name}>
        <button title="Open folder">📂</button>
      </td>
    </>
  )
}

const FileItem: FC<{
  file: BrowserItem
  addToPlaylist: (item: BrowserItem) => void
}> = ({ file, addToPlaylist }) => {
  const extension = file.name.split('.').pop()

  return (
    <>
      <td className="filebrowser__item-name" title={file.name}>
        {file.name}
        <div>{extension}</div>
      </td>
      <td>
        <button onClick={() => addToPlaylist(file)} title={`Add ${file.name} to pplaylist`}>
          <PlaySvg />
        </button>
      </td>
    </>
  )
}

const FileBrowser: FC<{}> = () => {
  const { vlc } = useContext(AppCtx)
  const [path, setPath] = useState('/')
  const [itemList, setItemList] = useState<ItemListType>({
    dirs: [],
    files: [],
  })

  const browseTo = useCallback(
    (path: string) => {
      setPath(path)

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
    },
    [vlc.browser]
  )

  const browseToParent = useCallback(() => {
    const path = itemList.parent?.path.split('/').slice(0, -2).join('/')
    if (!path) return
    browseTo(path)
  }, [browseTo, itemList.parent?.path])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => browseTo(path), [])

  const addToPlaylist = (item: BrowserItem) => {}

  return (
    <div id="filebrowser">
      <div className="filebrowser__actions">
        <Path path={path} />
        <button onClick={browseToParent}>↑</button>
      </div>
      <table className="filebrowser__items">
        <tbody>
          {itemList.dirs.map((file, i) => (
            <tr key={i} className={cx('filebrowser__item', file.type)}>
              <DirItem file={file} browseTo={() => browseTo(file.path)} />
            </tr>
          ))}
          {itemList.files.map((file, i) => (
            <tr key={i} className={cx('filebrowser__item', file.type)}>
              <FileItem file={file} addToPlaylist={addToPlaylist} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FileBrowser
