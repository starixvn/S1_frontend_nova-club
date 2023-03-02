import React, { Dispatch, SetStateAction } from 'react'

interface FloatingContextProps {
  activeLiveChat: boolean
  toggleLiveChat: Dispatch<SetStateAction<boolean>>
}

export const FloatingContext = React.createContext<FloatingContextProps>({
  activeLiveChat: false,
  toggleLiveChat: () => null,
})
