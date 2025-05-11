import type { Dispatch, SetStateAction } from 'react'
import type { Status } from '@types'
import type VLCApi from '@vlc'

export interface ActionsProps {
  setSkipTime: Dispatch<SetStateAction<string>>
  skipTime: string
  status?: Status
  updateStatus: () => void
  vlc: VLCApi
}
