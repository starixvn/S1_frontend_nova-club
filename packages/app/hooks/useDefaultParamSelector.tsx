import { RootState, useAppSelector } from 'app/provider/redux/store'
import { createSelector } from 'reselect'

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
  return useAppSelector(languageCurrencySelector)
}
