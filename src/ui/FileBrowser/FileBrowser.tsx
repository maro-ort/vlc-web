import React, {
  useCallback,
  useEffect,
  useState,
} from 'react'
import cx from 'classnames'
import ArrowUpSVG from '@svg/arrow-up.svg?react'
import ChevronLeftSVG from '@svg/chevrons-left.svg?react'
import ChevronRightSVG from '@svg/chevrons-right.svg?react'
import FolderPlusSVG from '@svg/folder-plus.svg?react'
import FolderSVG from '@svg/folder.svg?react'
import PlusSVG from '@svg/plus.svg?react'
import SaveSVG from '@svg/save.svg?react'
import { useApp, useLS, useUi } from '@ctx'
import type { BrowserItem } from '@types'
import type {
  BreadcrumbsProps,
  DirInfo,
  DirItemProps,
  FileItemProps,
  ItemList,
} from './types'

function Breadcrumbs ({ browseTo, path }: BreadcrumbsProps): React.JSX.Element {
  const breadcrumbs = path.split('/').filter(Boolean)
  const currentFolder = breadcrumbs.at(-1)

  const links = breadcrumbs.map((v, i) => ({
    name: v.slice(0, 2),
    path: '/' + breadcrumbs.slice(0, i + 1).join('/'),
  }))

  return (
    <div className="filebrowser__breadcrumbs">
      <div className="filebrowser__parents">
        <div onClick={() => { browseTo('/') }} title="/">
          /
        </div>
        {links.length > 0 && links
          .map((v, i) => (
            <div
              key={i}
              onClick={() => { browseTo(v.path) }}
              title={v.path}
            >
              {v.name}
            </div>
          ))
          .reduce((acc, c) => (<>{acc}/{c}</>))
        }
      </div>
      <div
        className="filebrowser__current"
        onClick={() => { browseTo(path) }}
      >
        {currentFolder}
      </div>
    </div>
  )
}

function DirItem ({ file, browseTo, getDirInfo }: DirItemProps): React.JSX.Element {
  const [dirInfo, setDirInfo] = useState<DirInfo | null>(null)

  useEffect(() => {
    const interval = setTimeout(() => {
      void getDirInfo(file.path).then(setDirInfo)
    }, 500)
    return () => { clearInterval(interval) }
  }, [])

  return (
    <>
      <div className="filebrowser__item-info" onClick={browseTo} title={file.name}>
        <div className="filebrowser__item-name">{file.name}</div>
        {dirInfo != null && (
          <div className="filebrowser__item-ext">
            Directories: {dirInfo.dirs} - Files: {dirInfo.files}
          </div>
        )}
      </div>
      <div onClick={browseTo} title={file.name}>
        <button title="Open folder">
          <FolderSVG />
        </button>
      </div>
    </>
  )
}

function FileItem ({ addToPlaylist, file }: FileItemProps): React.JSX.Element {
  const extension = (() => {
    const ext = file.name.split('.').pop()
    return ext != null && /^\w{2,5}$/.test(ext)
      ? ext.toLocaleUpperCase()
      : undefined
  })()

  return (
    <>
      <div className="filebrowser__item-info" title={file.name}>
        <div className="filebrowser__item-name">{file.name}</div>
        {extension != null && (
          <div className="filebrowser__item-ext">{extension}</div>
        )}
      </div>
      <div>
        <button
          onClick={() => { void addToPlaylist(file) }}
          title={`Add ${file.name} to Playlist`}
        >
          <PlusSVG />
        </button>
      </div>
    </>
  )
}

function FileBrowser (): React.JSX.Element {
  const { lsBrowserPath, lsStoreBrowserPath } = useLS()
  const { updatePlaylist, vlc } = useApp()
  const { filebrowserIsOpen, toggleFileBrowserOpen } = useUi()
  const [path, setPath] = useState(lsBrowserPath)
  const [itemList, setItemList] = useState<ItemList>({ dirs: [], files: [] })

  const browseTo = useCallback((path: string) => {
    setPath(path)
    void vlc
      ?.dir(path)
      .then(file => {
        return file.sort((a, b) => {
          return a.type === b.type
            ? a.name.localeCompare(b.name)
            : a.type.localeCompare(b.type)
        })
      })
      .then(file => {
        return file.reduce<ItemList>((acc, file) => {
          if (file.name === '..') acc.parent = file
          else if (file.type === 'dir') acc.dirs.push(file)
          else if (file.type === 'file') acc.files.push(file)
          return acc
        }, { dirs: [], files: [] })
      })
      .then(setItemList)
  }, [vlc])

  const getDirInfo = useCallback(async (path: string): Promise<DirInfo | null> => {
    if (vlc == null) return null
    return await vlc?.dir(path)
      .then(file => {
        return file.reduce((acc, { type }) => {
          if (type === 'dir') acc.dirs++
          else if (type === 'file') acc.files++
          return acc
        }, { dirs: -1, files: 0 })
      })
      .catch(() => null)
  }, [vlc])

  const browseToParent = useCallback(() => {
    const path = itemList.parent?.path.split('/').slice(0, -2).join('/') ?? '/'
    browseTo(path)
  }, [browseTo, itemList.parent?.path])

  useEffect(() => { browseTo(path) }, [])

  const addToPlaylist = useCallback(async (item: BrowserItem) => {
    if (vlc == null) return
    await vlc?.queue(item.uri).then(() => { updatePlaylist?.() })
  },[updatePlaylist, vlc])

  const addAllToPlaylist = useCallback(() => {
    void vlc?.queue(itemList.files.map(({ uri }) => uri)).then(updatePlaylist)
  }, [itemList, updatePlaylist, vlc])

  return (
    <div id="filebrowser" className={cx({ '--visible': filebrowserIsOpen })}>
      <div className="filebrowser__handle" onClick={toggleFileBrowserOpen}>
        {filebrowserIsOpen ? <ChevronRightSVG /> : <ChevronLeftSVG />}
      </div>
      <div className="filebrowser__browser">
        <div className="filebrowser__actions">
          <Breadcrumbs browseTo={browseTo} path={path} />
          <div className="filebrowser__buttons">
            <button
              title="Make folder default"
              onClick={() => { lsStoreBrowserPath?.(path) }}
            >
              <SaveSVG />
            </button>
            {itemList.files?.length > 0 && (
              <button title="Add all files" onClick={addAllToPlaylist}>
                <FolderPlusSVG />
              </button>
            )}
            <button onClick={browseToParent}>
              <ArrowUpSVG />
            </button>
          </div>
        </div>
        <div className="filebrowser__items">
          {itemList.dirs.map((file, i) => (
            <div key={i + file.path} className={cx('filebrowser__item', file.type)}>
              <DirItem
                browseTo={() => { browseTo(file.path) }}
                file={file}
                getDirInfo={getDirInfo}
              />
            </div>
          ))}
          {itemList.files.map((file, i) => (
            <div
              key={i + file.path}
              className={cx('filebrowser__item', file.type)}
            >
              <FileItem file={file} addToPlaylist={addToPlaylist} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FileBrowser
