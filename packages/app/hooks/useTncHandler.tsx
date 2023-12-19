import { useAppDispatch } from 'app/provider/redux/store'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import { useEffect } from 'react'


export default function useTncHandler() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    /* if tnc page is being viewed, home modal event should retriggere again */
    dispatch(TempSettingActions.setIsHomeEventModalTriggered(false))
  }, [])
}
