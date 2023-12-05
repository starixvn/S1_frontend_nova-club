import { LOCALIZATION_DOMAIN, LOCALIZATION_KEY } from '@env'
import { DevTools, FormatSimple, Tolgee } from '@tolgee/react'
import { Platform } from 'react-native'
import { LANGUAGE_CODE, LANGUAGE_NAMESPACE } from 'utils/constant'

export const tolgee = Tolgee().use(FormatSimple()).init({
  //   language: LANGUAGE_CODE.VIETNAM,
  //   defaultNs: LANGUAGE_NAMESPACE.MEMBER,
  //   fallbackLanguage: LANGUAGE_CODE.VIETNAM,
})

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
