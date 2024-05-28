import { useIsFocused } from 'app/hooks/isFocus/useIsFocused'
import { RootState, useAppSelector } from 'app/provider/redux/store'
import { EqualityFn, shallowEqual } from 'react-redux'

export interface UseSelector {
  <Selected = unknown>(
    selector: (state: RootState) => Selected,
    equalityFn?: EqualityFn<Selected>
  ): Selected
}

const useFocusedSelector: UseSelector = (selector, eqFn?) => {
  const isFocused = useIsFocused()
  return useAppSelector(selector, (prev, next) => {
    return (eqFn && eqFn(prev, next)) || !isFocused || shallowEqual(prev, next)
  })
}

export default useFocusedSelector
