import * as Localization from 'expo-localization'
import i18n from 'i18n-js'

import en from 'app/assets/locales/en.json'
import vi from 'app/assets/locales/vi.json'

// for fallback to EN
i18n.fallbacks = true
i18n.defaultLocale = 'en'

// select default locale to vi
i18n.locale = 'vi'
i18n.translations = { en, vi }

i18n.missingTranslation = function () {
  // eslint-disable-next-line prefer-rest-params
  // console.log('arugents', arguments)
  return arguments[0]
}

export default i18n
