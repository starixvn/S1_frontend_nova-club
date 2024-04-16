import { I18n } from 'i18n-js'
import React, { useCallback } from 'react'

import {
  TolgeeProvider,
  TolgeeStaticData,
  TreeTranslationsData,
  useTranslate,
} from '@tolgee/react'
import vi from 'app/assets/locales/vi.json'
import { Translate, tolgee, useTolgeeTranslate } from 'app/integrations/tolgee'
import { localizationApi } from 'services/localizationApi'
import { sleep } from 'utils/common'
import { LANGUAGE_CODE, LANGUAGE_NAMESPACE } from 'utils/constant'
import { store, useAppSelector } from '../redux/store'
import useFocusedLocalization from './useFocusedLocalization'

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

export default function useLocalization() {
  return useFocusedLocalization()
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
