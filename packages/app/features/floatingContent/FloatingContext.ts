import { createContext, Dispatch, SetStateAction } from 'react'

interface FloatingContextProps {
  activeLiveChat: boolean
  toggleLiveChat: Dispatch<SetStateAction<boolean>>
}

export const FloatingContext = createContext<FloatingContextProps>({
  activeLiveChat: false,
  toggleLiveChat: () => null,
})
