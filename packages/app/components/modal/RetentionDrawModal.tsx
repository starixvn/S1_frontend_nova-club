import useAlert from 'app/hooks/useAlert'
import { useAppSelector } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import { useRef, useState } from 'react'
import { useModal } from 'react-native-modalfy'
import { useDispatch } from 'react-redux'
import { useRetentionSpinMutation } from 'services/playerApi'
import { useRouter } from 'solito/router'
import SpinDrawContent from './SpinDrawContent'

const RetentionDrawModal = ({ modal: { closeModal } }) => {
  const dispatch = useDispatch()
  const { push } = useRouter()
  const { showAlert } = useAlert()
  const { closeModal: closeTargetModal } = useModal()

  const [spinRetentionWheel] = useRetentionSpinMutation()
  const retentionDrawBalance = useAppSelector(
    (s) => s.setting.retentionDrawBalance
  )

  const targetIndex = useRef(0)
  const [startAnimate, setStartAnimate] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [loopCount, setLoopCount] = useState(1)
  const [startAnimateWinPrizeFrame, setStartAnimateWinPrizeFrame] =
    useState(false)

  const retentionSpin = async () => {
    setLoopCount((prev) => prev + 20)
    setStartAnimate(true)
    setLoading(true)

    const { data, success, message } = await spinRetentionWheel()
      .unwrap()
      .catch((error) => {
        setLoading(false)
        showAlert(error)
        return error
      })

    if (success) {
      targetIndex.current = handleSpinMapping(data.code)
      dispatch(SettingActions.setRetentionDrawBalance(0)) // this is to trigger the memoized wheel
      // setSpinBalance((prev) => prev + 1)

      setTimeout(() => {
        showAlert({
          message: data.note,
          onClose: () => {
            setTimeout(() => handleClose(), 500)
          },
          persistent: true,
        })
        // setLoading(false) // since can only spin 1 time, retain the loading until its auto closed
      }, 5500)
      setStartAnimateWinPrizeFrame(true)
    } else {
      setLoading(false)
      // showAlert(message)
    }
  }

  const handleClose = () => {
    closeTargetModal('RetentionDrawModal')
    // closeTargetModal('RegisterModal')
    retentionDrawBalance > 0 &&
      dispatch(SettingActions.setRetentionDrawBalance(0))
  }

  const handleNavigateTnc = () => {
    closeTargetModal('RetentionDrawModal')
    push('/retention-spin-tnc')
  }

  const handleSpinMapping = (code: number) => {
    switch (code) {
      case 1:
        return 5 //0
      case 2:
        return 9 //30
      case 3:
        return 1 //50
      case 4:
        return 2 //80
      case 5:
        return 4 //100
      case 6:
        return 6 // 200
      case 7:
        return 8 // 600
      default:
        return 3 //Dummy Prize, can be 0,3,7
    }
  }

  return (
    <SpinDrawContent
      balance={retentionDrawBalance}
      srcPrize={require('app/assets/images/luckydraw/retention-prizes.png')}
      targetIndex={targetIndex}
      loopCount={loopCount}
      startAnimate={startAnimate}
      startAnimateWinPrizeFrame={startAnimateWinPrizeFrame}
      isLoading={isLoading}
      setLoading={setLoading}
      onClose={handleClose}
      onSpin={retentionSpin}
      onTnc={handleNavigateTnc}
    />
  )
}

export default RetentionDrawModal
