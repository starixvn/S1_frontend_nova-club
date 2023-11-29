import { I18n, Scope, TranslateOptions } from 'i18n-js'
import React from 'react'

import {
  TolgeeProvider,
  TolgeeStaticData,
  TreeTranslationsData,
  useTranslate,
} from '@tolgee/react'
import vi from 'app/assets/locales/vi.json'
import { tolgee } from 'app/integrations/tolgee'
import { localizationApi } from 'services/localizationApi'
import { sleep } from 'utils/common'
import { LANGUAGE_CODE, LANGUAGE_NAMESPACE } from 'utils/constant'
import { store, useAppSelector } from '../redux/store'

export type Translate = (scope: Scope, options?: TranslateOptions) => string

interface LocalizationProviderProps {
  children: React.ReactNode
  locale: LANGUAGE_CODE
  module?: string
  i18n: I18n
}

export function getLanguageFetcher(
  locale: LANGUAGE_CODE,
  namespace: LANGUAGE_NAMESPACE,
  fallbackTranslation: TreeTranslationsData
) {
  return async () => {
    // This is to ensure redux provider run 1 frame first before executing api
    await sleep(0)
    try {
      const resp = await store
        .dispatch(
          localizationApi.endpoints.translations.initiate({
            locale,
            namespace,
          })
        )
        .unwrap()

      return resp[locale]
    } catch (e) {
      console.log('Failed to get language', e)
      return fallbackTranslation
    }
  }
}

export function prepareTolgeeStaticDataByNamespace(
  namespace: LANGUAGE_NAMESPACE,
  fallbackTranslation: TreeTranslationsData
): TolgeeStaticData {
  const staticData = {}

  Object.values(LANGUAGE_CODE).forEach((locale) => {
    staticData[`${locale}:${namespace}`] = getLanguageFetcher(
      locale,
      namespace,
      fallbackTranslation
    )
  })

  return staticData
}

tolgee.addStaticData(
  prepareTolgeeStaticDataByNamespace(LANGUAGE_NAMESPACE.MEMBER, vi)
)
export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({
  children,
}) => {
  return <TolgeeProvider tolgee={tolgee}>{children}</TolgeeProvider>
}

function useTolgeeTranslate(ns: LANGUAGE_NAMESPACE) {
  const { t: tolgeeT } = useTranslate(ns)

  function t(key: string, placeholders) {
    return tolgeeT(
      key,
      ' ', // render empty string if no translation available / while being downloaded
      placeholders
    )
  }

  return { t }
}

export default function useLocalization() {
  return useTolgeeTranslate(LANGUAGE_NAMESPACE.MEMBER)
}

export function useAgentLocalization() {
  return useTolgeeTranslate(LANGUAGE_NAMESPACE.AGENT)
}

export const LocalizationProviderRedux = ({ children }) => {
  const locale = useAppSelector((s) => s.setting.locale)
  if (!tolgee.isRunning()) {
    tolgee.changeLanguage(locale) // load initial language
  }

  return (
    <TolgeeProvider
      tolgee={tolgee}
      options={{
        useSuspense: false, // prevents render blocking before tolgee done downloading translation
      }}
    >
      {children}
    </TolgeeProvider>
  )
}
