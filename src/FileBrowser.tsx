import React, { FC, SetStateAction, useCallback, useContext, useEffect, useState } from 'react'
import cx from 'classnames'

import { AppCtx } from './App'

const DirItem: FC<{
  file: BrowserItem
}> = ({ file }) => {
  return (
    <>
      <td>
        <p>dir</p>
      </td>
      <td className="filebrowser__item-name">{file.name}</td>
      <td>
        <button>▶</button>
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
        <input type="checkbox" value={file.uri} checked={selectedUris.includes(file.uri)} />
      </td>
      <td className="filebrowser__item-name" onClick={() => toggleSelectUri(file.uri)}>
        {file.name}
      </td>
      <td>
        <button>▶</button>
      </td>
    </>
  )
}

const FileBrowser: FC<{}> = () => {
  const { vlc } = useContext(AppCtx)
  const [files, setFiles] = useState<BrowserItem[]>([])
  const [selectedUris, setSelectedUris] = useState<string[]>([])

  /**
   * File management
   */
  const updateFiles = useCallback(
    (path?: string) => {
      void vlc.browser
        .fakeDir(path || '/')
        .then(f =>
          f.sort((a, b) => {
            if (a.name === '..') return -1
            else if (a.type === b.type) return a.name.localeCompare(b.name)
            return a.type.localeCompare(b.type)
          })
        )
        .then(setFiles)
    },
    [vlc]
  )

  useEffect(() => updateFiles, [updateFiles])

  /**
   * File selection
   */

  const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    // if (!checked)
  }

  const toggleSelectUri = useCallback(
    (uri: string) => {
      console.log('aaa')

      const checked = selectedUris.includes(uri)
      console.log({ checked })

      if (checked) setSelectedUris(selectedUris.filter(v => v !== uri))
      else setSelectedUris([...selectedUris, uri])
    },
    [selectedUris]
  )

  const queueSelected = () => {}

  return (
    <div id="filebrowser">
      <div className="filebrowser__actions">
        <input type="checkbox" onChange={toggleSelectAll} />
        <button onClick={queueSelected}>▶</button>
      </div>
      <table className="filebrowser__items">
        <tbody>
          {files.map((file, i) => {
            const itemComponent = {
              dir: <DirItem file={file} />,
              file: <FileItem file={file} selectedUris={selectedUris} toggleSelectUri={toggleSelectUri} />,
            }[file.type]
            return (
              <tr key={i} className={cx('filebrowser__item', file.type)}>
                {itemComponent}
              </tr>
            )
          })}
        </tbody>
      </table>
      <pre style={{ width: '200px' }}>{JSON.stringify({ selectedUris }, null, 2)}</pre>
    </div>
  )
}

export default FileBrowser
