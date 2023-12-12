import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import React, {
  Children,
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useModal } from 'react-native-modalfy'
import { useIsFocused } from 'app/hooks/isFocus/useIsFocused'

type Props = {
  children: ReactNode
}

const HomeEventContext = createContext<{
  addResult: (result: HomeEventItem | HomeEventItem[]) => void
  flagCompletedChecking: (string) => void
}>({
  addResult: () => {},
  flagCompletedChecking: () => {},
})

const MaxWaitingMs = 5000

export type HomeEventItem = {
  content: FC<any> | FC<any>[]
  tnc?: () => void
  priority: number
}

export default function HomeEventProvider({ children }: Props) {
  const resultsRef = useRef<HomeEventItem[]>([])
  const completedSourcesRef = useRef<string[]>([])
  const { openModal } = useModal()
  const [isReady, setReady] = useState(false)
  const dispatch = useAppDispatch()

  const isFocused = useIsFocused()
  const isLoggedIn = useAppSelector((s) => !!s.auth.info)
  const isHomeEventModalTriggered = useAppSelector(
    (s) => s.tempSetting.isHomeEventModalTriggered
  )

  const state = useMemo(() => {
    return {
      addResult: (result: HomeEventItem | HomeEventItem[]) => {
        if (Array.isArray(result))
          resultsRef.current = resultsRef.current.concat(result)
        else resultsRef.current.push(result)
      },
      flagCompletedChecking: (source: string) => {
        completedSourcesRef.current.push(source)
        // could use uniqBy to prevent duplicated string
        if (completedSourcesRef.current.length >= Children.count(children)) {
          setReady(true)
        }
      },
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function showModal() {
    dispatch(TempSettingActions.setIsHomeEventModalTriggered(true))
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

  useEffect(() => {
    /* for app when focused on home tab again */
    if (
      isFocused &&
      isReady &&
      !isHomeEventModalTriggered &&
      resultsRef.current.length > 0
    )
      showModal()
  }, [isFocused, isHomeEventModalTriggered, isReady])

  useEffect(() => {
    if (isLoggedIn && !isHomeEventModalTriggered && !isReady) {
      const openModalTimer = setTimeout(() => setReady(true), MaxWaitingMs)
      return () => {
        clearTimeout(openModalTimer)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, isReady])

  return (
    <HomeEventContext.Provider value={state}>
      {/* Currently only logged will trigger the pop up  */}
      {isLoggedIn && !isHomeEventModalTriggered ? children : null}
    </HomeEventContext.Provider>
  )
}

export const useHomeEvent = () => {
  return useContext(HomeEventContext)
}
