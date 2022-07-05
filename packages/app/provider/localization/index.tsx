import { Scope, TranslateOptions } from 'i18n-js'
import React, { createContext, useContext, useMemo } from 'react'
import { useAppSelector } from '../redux/store'
import i18n from './i18n'

const LocalizationContext = createContext<{
  t: (scope: Scope, options?: TranslateOptions) => string
}>(null)

export type Translate = (scope: Scope, options?: TranslateOptions) => string

interface LocalizationProviderProps {
  locale: string
  i18n: {
    translate: Translate
  }
}

export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({
  children,
  locale,
  i18n,
}) => {
  const localizationContext = useMemo(
    () => ({
      t: (scope: Scope, options?: TranslateOptions) =>
        i18n.translate(scope, { locale, ...options }),
    }),
    [locale, i18n]
  )

  return (
    <LocalizationContext.Provider value={localizationContext}>
      {children}
    </LocalizationContext.Provider>
  )
}

export default function useLocalization() {
  return useContext(LocalizationContext)
}

export const LocalizationProviderRedux = ({ children }) => {
  const locale = useAppSelector((s) => s.setting.locale)

  return (
    <LocalizationProvider locale={locale} i18n={i18n}>
      {children}
    </LocalizationProvider>
  )
}
