import { useAppSelector } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import { useEffect } from 'react'
import { useModal } from 'react-native-modalfy'
import { useDispatch } from 'react-redux'
import { useLazyFreeSpinQuery } from 'services/playerApi'

const LuckyDrawTrigger = () => {
  const username = useAppSelector((s) => s.auth.info?.playerName) ?? ''
  const [getFreeSpinInfo] = useLazyFreeSpinQuery()
  const dispatch = useDispatch()
  const { openModal } = useModal()

  const CheckLuckyDrawBalance = async () => {
    const { data } = await getFreeSpinInfo({ username })
    const freeSpinBalance = data?.data?.wheel_info.totalBalance ?? 0
    // console.log('Total Balance', data?.data?.wheel_info.totalBalance)

    if (freeSpinBalance > 0) {
      setTimeout(() => {
        openModal('CnyLuckyDrawModal')
      }, 1000)
    }

    dispatch(SettingActions.setLuckyDrawBalance(freeSpinBalance))
  }

  useEffect(() => {
    CheckLuckyDrawBalance()
  }, [])

  return null
}

export default LuckyDrawTrigger
