import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import cx from 'classnames'

import { AppCtx } from '@src/App'

import { ReactComponent as PlaySvg } from '@svg/play.svg'

type ItemListType = {
  parent?: BrowserItem
  dirs: BrowserItem[]
  files: BrowserItem[]
}

const Breadcrumbs: FC<{ path: string; browseTo: (path: string) => void }> = ({ path, browseTo }) => {
  // Replace /home/* with ~/*
  // if (path.startsWith('/home/')) {
  //   path = path.replace(/^\/home\//, '~')
  // const homeRegex = /^\/home\/([^\\/]+)/
  // }
  // Shorten folder names
  const breadcrumbs = path.split('/').filter(Boolean)
  const current = breadcrumbs.pop() // NOTE: breadcrumbs has mutated

  const links = breadcrumbs.map((v, i) => ({
    name: v.slice(0, 2),
    path: '/' + breadcrumbs.slice(0, i + 1).join('/'),
  }))

  return (
    <div className="filebroweser__breadcrumbs">
      <div className="filebrowser__parents">
        {links
          .map((v, i) => (
            <div key={i} onClick={() => browseTo(v.path)} title={v.path}>
              {v.name}
            </div>
          ))
          .reduce((acc, c) => (
            <>
              {acc}/{c}
            </>
          ))}
      </div>
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
      <div className="filebrowser__item-name" onClick={browseTo} title={file.name}>
        {file.name}
      </div>
      <div onClick={browseTo} title={file.name}>
        <button title="Open folder">📂</button>
      </div>
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
      <div className="filebrowser__item-name" title={file.name}>
        {file.name}
        <div>{extension}</div>
      </div>
      <div>
        <button onClick={() => addToPlaylist(file)} title={`Add ${file.name} to pplaylist`}>
          <PlaySvg />
        </button>
      </div>
    </>
  )
}

const FileBrowser: FC<{}> = () => {
  const { vlc, DEFAULT_PATH } = useContext(AppCtx)
  const [path, setPath] = useState(DEFAULT_PATH)
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
        <Breadcrumbs browseTo={browseTo} path={path} />
        <div>{itemList.files?.length > 0 && <button title="Add all files">📂</button>}</div>
        <button onClick={browseToParent}>↑</button>
      </div>
      <div className="filebrowser__items">
        {itemList.dirs.map((file, i) => (
          <div key={i} className={cx('filebrowser__item', file.type)}>
            <DirItem file={file} browseTo={() => browseTo(file.path)} />
          </div>
        ))}
        {itemList.files.map((file, i) => (
          <div key={i} className={cx('filebrowser__item', file.type)}>
            <FileItem file={file} addToPlaylist={addToPlaylist} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default FileBrowser
