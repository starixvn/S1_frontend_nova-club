import * as Localization from 'expo-localization'
import i18n from 'i18n-js'

import en from './en.json'
import vi from './vi.json'

i18n.defaultLocale = 'vi'
i18n.locale = 'vi'
i18n.translations = { en, vi }

i18n.fallbacks = true
i18n.missingTranslation = function () {
  // eslint-disable-next-line prefer-rest-params
  return arguments[0]
}

export default i18n
