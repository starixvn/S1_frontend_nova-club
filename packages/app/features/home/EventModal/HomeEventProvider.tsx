import { useAppSelector } from 'app/provider/redux/store'
import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import { useModal } from 'react-native-modalfy'

type Props = {
  children: ReactNode
}

const HomeEventContext = createContext<{
  addResult: (result: HomeEventItem | HomeEventItem[]) => void
}>({
  addResult: () => {},
})

const MaxWaitingMs = 2000

export type HomeEventItem = {
  content: FC<any> | FC<any>[]
  tnc?: () => void
  priority: number
}

export default function HomeEventProvider({ children }: Props) {
  const resultsRef = useRef<HomeEventItem[]>([])
  const { openModal, closeModal } = useModal()

  const isLoggedIn = useAppSelector((s) => !!s.auth.info)

  const state = useMemo(() => {
    return {
      addResult: (result: HomeEventItem | HomeEventItem[]) => {
        if (Array.isArray(result))
          resultsRef.current = resultsRef.current.concat(result)
        else resultsRef.current.push(result)
      },
    }
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      const openModalTimer = setTimeout(() => {
        if (resultsRef.current.length > 0) {
          openModal(
            'HomeEventModal',
            {
              persistent: true,
              data: resultsRef.current.sort((a, b) => b.priority - a.priority),
            },
            () => {
              resultsRef.current = []
            }
          )
        }
      }, MaxWaitingMs)

      return () => {
        clearTimeout(openModalTimer)
        resultsRef.current = []
        closeModal('HomeEventModal')
      }
    } else resultsRef.current = []
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])

  return (
    <HomeEventContext.Provider value={state}>
      {/* Currently only logged will trigger the pop up  */}
      {isLoggedIn ? children : null}
    </HomeEventContext.Provider>
  )
}

export const useHomeEvent = () => {
  return useContext(HomeEventContext)
}
