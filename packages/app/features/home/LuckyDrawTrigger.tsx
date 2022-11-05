import { useAppSelector } from 'app/provider/redux/store'
import { useEffect } from 'react'
import { useModal } from 'react-native-modalfy'

const LuckyDrawTrigger = () => {
  const { openModal } = useModal()
  const luckyDrawBalance = useAppSelector((s) => s.setting.luckyDrawBalance)

  useEffect(() => {
    if (luckyDrawBalance && luckyDrawBalance > 0) {
      setTimeout(() => {
        openModal('LuckyDrawModal')
      }, 500)
    }
  }, [])

  return null
}

export default LuckyDrawTrigger
