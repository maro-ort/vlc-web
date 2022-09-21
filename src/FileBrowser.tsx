import React, { FC, useContext, useEffect, useState } from 'react'
import { AppCtx } from './App'

const DirItem: FC<{
  dir: BrowserItem
}> = ({ dir }) => {
  return <div>dir: {dir.name}</div>
}

const FileItem: FC<{
  file: BrowserItem
}> = ({ file }) => {
  return <div>file: {file.name}</div>
}

const FileBrowser: FC<{}> = () => {
  const { vlc } = useContext(AppCtx)
  const [files, setFiles] = useState<BrowserItem[]>([])

  useEffect(() => {
    void vlc.browser
      .fakeDir('/')
      .then(f =>
        f.sort((a, b) => {
          if (a.name === '..') return -1
          else if (a.type === b.type) return a.name.localeCompare(b.name)
          return a.type.localeCompare(b.type)
        })
      )
      .then(setFiles)
  }, [vlc])

  return (
    <div id="file-browser">
      {files.map(
        (file, i) =>
          ({
            dir: <DirItem dir={file} />,
            file: <FileItem file={file} />,
          }[file.type])
      )}
    </div>
  )
}

export default FileBrowser
