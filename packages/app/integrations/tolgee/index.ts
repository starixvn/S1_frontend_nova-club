import {
  CombinedOptions,
  DefaultParamType,
  FormatSimple,
  Tolgee,
  TranslationKey,
  useTranslate
} from '@tolgee/react'
import { useCallback } from 'react'
import { LANGUAGE_NAMESPACE } from 'utils/constant'

export type Translate = (
  key: TranslationKey,
  placeholders?: CombinedOptions<DefaultParamType>
) => string

export const tolgee = Tolgee().use(FormatSimple()).init({
  //   language: LANGUAGE_CODE.VIETNAM,
  //   defaultNs: LANGUAGE_NAMESPACE.MEMBER,
  //   fallbackLanguage: LANGUAGE_CODE.VIETNAM,
})

export function useTolgeeTranslate(ns: LANGUAGE_NAMESPACE) {
  const { t: tolgeeT, isLoading } = useTranslate(ns)

  const t = useCallback<Translate>(
    (key, placeholders) => {
      return tolgeeT(
        key,
        isLoading ? ' ' : key, // render empty string if no translation available / while being downloaded
        placeholders
      )
    },
    [tolgeeT, isLoading]
  )

  return { t }
}

// To enable on Staging / Prelaunch
// if (Platform.OS === 'web') {
//   tolgee.addPlugin(
//     DevTools({
//       credentials: {
//         apiUrl: LOCALIZATION_DOMAIN,
//         apiKey: LOCALIZATION_KEY,
//       },
//     })
//   )
// }
