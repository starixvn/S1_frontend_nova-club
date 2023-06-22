import { I18n, MissingTranslationStrategy } from 'i18n-js'

import en from 'app/assets/locales/en.json'
import vi from 'app/assets/locales/vi.json'

export const i18n = new I18n(
  {
    en: Object.assign(en),
    vi: Object.assign(vi),
  },
  {
    enableFallback: true,
    defaultLocale: 'en',
    locale: 'en',
  }
)

const extendGuessStrategy: MissingTranslationStrategy = (
  i18n,
  scope = '',
  options
) => {
  /* Extracted from https://github.com/fnando/i18n/blob/main/src/MissingTranslation.ts */
  if (scope instanceof Array) {
    scope = scope.join(i18n.defaultSeparator)
  }

  // console.log('🚫 Missing translation', scope)

  // Get only the last portion of the scope.
  const message = scope.split(i18n.defaultSeparator).slice(-1)[0] ?? ''

  // Replace underscore with space and camelcase with space and
  // lowercase letter.
  return (
    i18n.missingTranslationPrefix +
    message
      .replace('_', ' ')
      .replace(
        /([a-z])([A-Z])/g,
        (_match: string, p1: string, p2: string) => `${p1} ${p2.toLowerCase()}`
      )
  )
}

i18n.missingTranslation.register('empty', extendGuessStrategy)
i18n.missingBehavior = 'empty'

export default i18n
