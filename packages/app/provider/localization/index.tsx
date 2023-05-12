import { I18n, Scope, TranslateOptions } from 'i18n-js'
import React, { createContext, useContext, useMemo } from 'react'
import { useAppSelector } from '../redux/store'
import i18n from './i18n'

const LocalizationContext = createContext<{
  t: (scope: Scope, options?: TranslateOptions) => string
}>(null)

export type Translate = (scope: Scope, options?: TranslateOptions) => string

interface LocalizationProviderProps {
  children: React.ReactNode
  locale: string
  module?: string
  i18n: I18n
}

export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({
  children,
  locale,
  i18n,
  module,
}) => {
  const localizationContext = useMemo(
    () => ({
      t: (scope: Scope = '', options?: TranslateOptions) =>
        i18n.translate(module ? `${module}.${scope}` : scope, {
          locale,
          ...options,
        }),
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

export function useAgentLocalization() {
  const { t } = useLocalization()

  return {
    t: (scope: Scope, options?: TranslateOptions) =>
      t(`agent.${scope}`, { ...options }),
  }
}

export const LocalizationProviderRedux = ({ children }) => {
  const locale = useAppSelector((s) => s.setting.locale)

  return (
    <LocalizationProvider locale={locale} i18n={i18n}>
      {children}
    </LocalizationProvider>
  )
}
