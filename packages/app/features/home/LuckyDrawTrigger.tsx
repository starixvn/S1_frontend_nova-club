import { useAppSelector } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import { memo, useEffect } from 'react'
import { useModal } from 'react-native-modalfy'
import { useDispatch } from 'react-redux'
import { Shield_Action } from 'services/authApi.type'
import { useLazyFreeSpinQuery } from 'services/playerApi'

const LuckyDrawTrigger = () => {
  const username = useAppSelector((s) => s.auth.info?.playerName) ?? ''
  const shieldStatus = useAppSelector((s) => s.auth.syncShieldStatus) ?? ''
  const syncShieldActionType =
    useAppSelector((s) => s.auth.syncShieldActionType) ?? ''
  const luckyDrawTriggered = useAppSelector(
    (state) => state.tempSetting.luckyDrawTriggered
  )
  const [getFreeSpinInfo] = useLazyFreeSpinQuery()
  const dispatch = useDispatch()
  const { openModal } = useModal()

  const CheckLuckyDrawBalance = async () => {
    const { data } = await getFreeSpinInfo({ username })
    const freeSpinBalance = data?.data?.wheel_info.totalBalance ?? 0

    if (freeSpinBalance > 0) {
      setTimeout(() => {
        openModal('CnyLuckyDrawModal')
      }, 1000)
    }

    const responseData = data?.data
    if (responseData && 'note' in responseData) {
      const note = responseData.note
      openModal('AlertModal', {
        message: note,
        onClose: () => {
          return false
        },
      })
    }

    dispatch(SettingActions.setLuckyDrawBalance(freeSpinBalance))
    dispatch(TempSettingActions.setLuckyDrawTriggered(true))
  }

  useEffect(() => {
    console.log('Shield Action Type is: ', syncShieldActionType)
    console.log('Shield Status is: ', shieldStatus)

    if (!shieldStatus || luckyDrawTriggered) {
      return
    }

    if (
      syncShieldActionType === Shield_Action.LOGIN ||
      syncShieldActionType === Shield_Action.NONE ||
      syncShieldActionType === Shield_Action.REGISTER
    ) {
      CheckLuckyDrawBalance()
    }
  }, [shieldStatus])

  return null
}

export default memo(LuckyDrawTrigger)
