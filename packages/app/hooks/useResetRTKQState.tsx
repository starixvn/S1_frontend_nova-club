import { LANGUAGE_CODE } from 'app/constant/language'
import { SettingActions } from 'app/store/setting.slice'
import { useCallback } from 'react'
import { baseApi } from 'services/baseApi'
import { useAppDispatch } from '../provider/redux/store'

const useResetRTKQState = () => {
  const dispatch = useAppDispatch()

  const resetRTKQState = useCallback(() => {
    dispatch(baseApi.util.resetApiState())

    dispatch(SettingActions.removeReferral())
    dispatch(SettingActions.setLocale(LANGUAGE_CODE.VIETNAM))
  }, [dispatch])

  return {
    resetRTKQState,
  }
}

export default useResetRTKQState
