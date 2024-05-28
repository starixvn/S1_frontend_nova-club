import { useContext } from 'react'
import { FocusedLocalizationContext } from './FocusedLocalizationProvider'

export default function useFocusedLocalization() {
  const translate = useContext(FocusedLocalizationContext)
  return { t: translate }
}
