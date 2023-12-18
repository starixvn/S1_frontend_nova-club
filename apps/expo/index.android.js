// registerRootComponent happens in "expo-router/entry"
import 'expo-router/entry'

// https://github.com/facebook/hermes/issues/23#issuecomment-799253902
require('@formatjs/intl-getcanonicallocales/polyfill')
require('@formatjs/intl-locale/polyfill')
require('@formatjs/intl-pluralrules/polyfill')
require('@formatjs/intl-pluralrules/locale-data/en')
require('@formatjs/intl-numberformat/polyfill')
require('@formatjs/intl-numberformat/locale-data/en')
require('@formatjs/intl-datetimeformat/polyfill')
require('@formatjs/intl-datetimeformat/locale-data/en')
require('@formatjs/intl-datetimeformat/add-golden-tz')
