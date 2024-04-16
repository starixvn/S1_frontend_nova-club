import { useIsFocused } from 'app/hooks/isFocus/useIsFocused'
import { Translate, useTolgeeTranslate } from 'app/integrations/tolgee'
import React, {
  ReactNode,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { LANGUAGE_NAMESPACE } from 'utils/constant'

type Props = {
  namespace: LANGUAGE_NAMESPACE
  children: ReactNode
  disabled?: boolean // use on Root layer to skip caching
}

export const FocusedLocalizationContext = createContext<Translate>((k, p) => '')

export default function FocusedLocalizationProvider({
  namespace = LANGUAGE_NAMESPACE.MEMBER,
  disabled,
  children,
}: Props) {
  const { t } = useTolgeeTranslate(namespace)
  const isFocused = useIsFocused()
  const localT = useRef<Translate>(t)
  // const [memoizedT, setMemoizedT] = useState<Translate>(t)

  useEffect(() => {
    if (isFocused && !disabled) {
      localT.current = t
    }
  }, [isFocused, t, disabled])

  return (
    <FocusedLocalizationContext.Provider value={disabled ? t : localT.current}>
      {children}
    </FocusedLocalizationContext.Provider>
  )
}
