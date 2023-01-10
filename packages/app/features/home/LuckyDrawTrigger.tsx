import { useAppSelector } from 'app/provider/redux/store'
import { useEffect } from 'react'
import { Platform } from 'react-native'
import { useModal } from 'react-native-modalfy'

const LuckyDrawTrigger = () => {
  const { openModal } = useModal()
  const luckyDrawBalance = useAppSelector((s) => s.setting.luckyDrawBalance)

  useEffect(() => {
    if (true) {
      setTimeout(() => {
        openModal('CnyLuckyDrawModal')
      }, 1000)
    }
  }, [])

  return null
}

export default LuckyDrawTrigger
