import React, { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import cx from 'classnames'

import { AppCtx } from '@src/App'

import { ReactComponent as PlaySvg } from '@svg/play.svg'

type ItemListType = {
  parent?: BrowserItem
  dirs: BrowserItem[]
  files: BrowserItem[]
}

type DirInfoType = {
  dirs: number
  files: number
}

const Breadcrumbs: FC<{ path: string; browseTo: (path: string) => void }> = ({ path, browseTo }) => {
  // Replace /home/* with ~/*
  // if (path.startsWith('/home/')) {
  //   path = path.replace(/^\/home\//, '~')
  //   // const homeRegex = /^\/home\/([^\\/]+)/
  // }
  // Shorten folder names
  const breadcrumbs = path.split('/').filter(Boolean)
  const current = breadcrumbs.pop() // NOTE: breadcrumbs has mutated

  const links = breadcrumbs.map((v, i) => ({
    name: v.slice(0, 2),
    path: '/' + breadcrumbs.slice(0, i + 1).join('/'),
  }))

  return (
    <div className="filebrowser__breadcrumbs">
      <div className="filebrowser__parents">
        <div onClick={() => browseTo('/')} title="/">
          /
        </div>
        {links.length > 0 &&
          links
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
  getDirInfo: (path: string) => Promise<DirInfoType | undefined>
}> = ({ file, browseTo, getDirInfo }) => {
  const [dirInfo, setDirInfo] = useState<DirInfoType>()

  useEffect(() => {
    // TODO: Display loader
    const interval = setTimeout(() => getDirInfo(file.path).then(setDirInfo), 500)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="filebrowser__item-info" onClick={browseTo} title={file.name}>
        <div className="filebrowser__item-name">{file.name}</div>
        {dirInfo && (
          <div className="filebrowser__item-ext">
            Directories: {dirInfo.dirs}, files: {dirInfo.files}
          </div>
        )}
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
  const extension = (() => {
    const ext = file.name.split('.').pop()
    // NOTE: Naive extension validation
    return ext && /^\w{2,5}$/.test(ext) ? ext.toLocaleUpperCase() : undefined
  })()

  return (
    <>
      <div className="filebrowser__item-info" title={file.name}>
        <div className="filebrowser__item-name">{file.name}</div>
        {extension && <div className="filebrowser__item-ext">{extension}</div>}
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
  const { DEFAULT_PATH, updatePlaylist, vlc } = useContext(AppCtx)
  const [path, setPath] = useState(DEFAULT_PATH)
  const [itemList, setItemList] = useState<ItemListType>({
    dirs: [],
    files: [],
  })

  const browseTo = useCallback(
    (path: string) => {
      setPath(path)

      void vlc.browser
        .dir(path)
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

  const getDirInfo = useCallback(
    (path: string): Promise<DirInfoType | undefined> => {
      return vlc.browser
        .dir(path)
        .then(f =>
          f.reduce(
            (acc, { type }) => {
              if (type === 'dir') acc.dirs++
              else if (type === 'file') acc.files++
              return acc
            },
            { dirs: -1, files: 0 }
          )
        )
        .catch(() => undefined)
    },
    [vlc.browser]
  )

  const browseToParent = useCallback(() => {
    const path = itemList.parent?.path.split('/').slice(0, -2).join('/') || '/'
    browseTo(path)
  }, [browseTo, itemList.parent?.path])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => browseTo(path), [])

  const addToPlaylist = useCallback(
    (item: BrowserItem) => vlc.controls.enqueueFile(item.uri).then(() => updatePlaylist?.()),
    [updatePlaylist, vlc]
  )

  const addAllToPlaylist = useCallback(() => {
    ;(async () => {
      for (const item of itemList.files) {
        await vlc.controls.enqueueFile(item.uri)
      }
      updatePlaylist?.()
    })()
  }, [updatePlaylist, vlc])

  return (
    <div id="filebrowser">
      <div className="filebrowser__actions">
        <Breadcrumbs browseTo={browseTo} path={path} />
        <div>
          {itemList.files?.length > 0 && (
            <button title="Add all files" onClick={addAllToPlaylist}>
              📂
            </button>
          )}
        </div>
        <button onClick={browseToParent}>↑</button>
      </div>
      <div className="filebrowser__items">
        {itemList.dirs.map((file, i) => (
          <div key={i + file.path} className={cx('filebrowser__item', file.type)}>
            <DirItem file={file} browseTo={() => browseTo(file.path)} getDirInfo={getDirInfo} />
          </div>
        ))}
        {itemList.files.map((file, i) => (
          <div key={i + file.path} className={cx('filebrowser__item', file.type)}>
            <FileItem file={file} addToPlaylist={addToPlaylist} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default FileBrowser
