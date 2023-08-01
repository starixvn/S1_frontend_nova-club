import { SettingActions } from 'app/store/setting.slice'
// import { TempSettingActions } from 'app/store/tempSetting.slice'
import { useCallback } from 'react'
import { baseApi } from 'services/baseApi'
import { useAppDispatch } from '../provider/redux/store'
import { LANGUAGE_CODE } from 'app/utils/constant'
import { TempSettingActions } from 'app/store/tempSetting.slice'

const useResetRTKQState = () => {
  const dispatch = useAppDispatch()

  const resetRTKQState = useCallback(() => {
    dispatch(baseApi.util.resetApiState())

    // dispatch(TempSettingActions.toggleTriggerPopupEvent(true))
    dispatch(TempSettingActions.setLuckyDrawTriggered(false))
    dispatch(SettingActions.removeReferral())
    dispatch(SettingActions.setLocale(LANGUAGE_CODE.VIETNAM))
  }, [dispatch])

  return {
    resetRTKQState,
  }
}

export default useResetRTKQState
