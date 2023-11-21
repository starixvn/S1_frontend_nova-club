import { I18n, Scope, TranslateOptions } from 'i18n-js'
import React, { useEffect } from 'react'

import {
  TolgeeProvider,
  TolgeeStaticData,
  TreeTranslationsData,
  useTranslate,
} from '@tolgee/react'
import { localizationApi } from 'services/localizationApi'
import { sleep } from 'utils/common'
import { LANGUAGE_CODE, LANGUAGE_NAMESPACE } from 'utils/constant'
import { store, useAppSelector } from '../redux/store'
import { tolgee } from 'app/integrations/tolgee'
import vi from 'app/assets/locales/vi.json'

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

export default function useLocalization() {
  return useTranslate(LANGUAGE_NAMESPACE.MEMBER)
}

export function useAgentLocalization() {
  return useTranslate(LANGUAGE_NAMESPACE.AGENT)
}

export const LocalizationProviderRedux = ({ children }) => {
  // // This is preserved to trigger rerender on language changed
  const locale = useAppSelector((s) => s.setting.locale)
  if (tolgee.getLanguage() !== locale) tolgee.changeLanguage(locale)

  return <TolgeeProvider tolgee={tolgee}>{children}</TolgeeProvider>
}
