import { useIsFocused } from 'app/hooks/isFocus/useIsFocused'
import { Translate, useTolgeeTranslate } from 'app/integrations/tolgee'
import React, { ReactNode, createContext, useEffect, useState } from 'react'
import { LANGUAGE_NAMESPACE } from 'utils/constant'

type Props = {
  namespace: LANGUAGE_NAMESPACE
  children: ReactNode
  disabled?: boolean // to avoid delayed 1 frame rerender when language changes
}

export const FocusedLocalizationContext = createContext<Translate | null>(null)

export default function FocusedLocalizationProvider({
  namespace = LANGUAGE_NAMESPACE.MEMBER,
  children,
}: Props) {
  const { t } = useTolgeeTranslate(namespace)

  return (
    <FocusedLocalizationContext.Provider value={t}>
      {children}
    </FocusedLocalizationContext.Provider>
  )
}
