import { RootState } from 'app/provider/redux/store'
import { createSelector } from 'reselect'
import useFocusedSelector from './useFocusedSelector'

export const languageCurrencySelector = createSelector(
  (s: RootState) => s.setting.currency,
  (s: RootState) => s.setting.locale,
  (currency, locale) => {
    return {
      currency,
      locale,
    }
  }
)

export default function useDefaultParamSelector() {
  return useFocusedSelector(languageCurrencySelector)
}
