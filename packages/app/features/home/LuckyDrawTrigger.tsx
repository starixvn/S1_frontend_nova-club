import { useAppSelector } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import { useEffect } from 'react'
import { useModal } from 'react-native-modalfy'
import { useDispatch } from 'react-redux'
import { Shield_Action } from 'services/authApi.type'
import { useLazyFreeSpinQuery } from 'services/playerApi'

const LuckyDrawTrigger = () => {
  const username = useAppSelector((s) => s.auth.info?.playerName) ?? ''
  const shieldStatus = useAppSelector((s) => s.auth.syncShieldStatus) ?? ''
  const syncShieldActionType =
    useAppSelector((s) => s.auth.syncShieldActionType) ?? ''
  const [getFreeSpinInfo] = useLazyFreeSpinQuery()
  const dispatch = useDispatch()
  const { openModal } = useModal()

  const CheckLuckyDrawBalance = async () => {
    const { data } = await getFreeSpinInfo({ username })
    const freeSpinBalance = data?.data?.wheel_info.totalBalance ?? 0
    // console.log('Total Balance', data?.data?.wheel_info.totalBalance)

    console.log('Free Spin Balance: ', data?.data?.wheel_info)
    if (freeSpinBalance > 0) {
      setTimeout(() => {
        openModal('CnyLuckyDrawModal')
      }, 1000)
    }

    dispatch(SettingActions.setLuckyDrawBalance(freeSpinBalance))
  }

  useEffect(() => {
    console.log('Shield Action Type is: ', syncShieldActionType)
    console.log('Shield Status is: ', shieldStatus)
    if (
      syncShieldActionType === Shield_Action.LOGIN ||
      syncShieldActionType === Shield_Action.NONE ||
      (syncShieldActionType === Shield_Action.REGISTER && shieldStatus === true)
    ) {
      CheckLuckyDrawBalance()
    }
  }, [shieldStatus])

  return null
}

export default LuckyDrawTrigger
