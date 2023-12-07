import SpinDrawContent from 'app/components/modal/SpinDrawContent'
import useAlert from 'app/hooks/useAlert'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import React, { useRef, useState } from 'react'
import { useLuckySpinMutation } from 'services/playerApi'
import { useRouter } from 'solito/router'
import { useHomeEventModal } from '../../HomeEventModal'

type Props = {}

export default function LuckyDrawContent({}: Props) {
  const dispatch = useAppDispatch()
  const { showAlert } = useAlert()
  const { dimension } = useHomeEventModal()

  const [spinLuckyWheel] = useLuckySpinMutation()
  const luckyDrawBalance = useAppSelector((s) => s.setting.luckyDrawBalance)

  const targetIndex = useRef(0)
  const [startAnimate, setStartAnimate] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [loopCount, setLoopCount] = useState(1)
  const [startAnimateWinPrizeFrame, setStartAnimateWinPrizeFrame] =
    useState(false)

  const spin = async () => {
    setLoopCount((prev) => prev + 20)
    setStartAnimate(true)
    setLoading(true)

    const { data, success, message } = await spinLuckyWheel()
      .unwrap()
      .catch((error) => {
        setLoading(false)
        showAlert(error)
        return error
      })

    if (success) {
      targetIndex.current = handleSpinMapping(data.code)
      dispatch(SettingActions.setLuckyDrawBalance(0)) // this is to trigger the memoized wheel
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
    // closeModal()
    luckyDrawBalance > 0 && dispatch(SettingActions.setLuckyDrawBalance(0))
  }

  const handleNavigateTnc = () => {
    // closeModal(undefined, () => push('/lucky-spin-tnc'))
  }

  const handleSpinMapping = (code: number) => {
    switch (code) {
      case 1:
        return 9 //8
      case 2:
        return 1 //18
      case 3:
        return 6 //38
      case 4:
        return 2 //98
      case 5:
        return 4 //188
      case 6:
        return 8 // 388
      case 7:
        return 5 // 888
      default:
        return 3 //Dummy Prize, can be 0,3,7
    }
  }

  return (
    <SpinDrawContent
      balance={luckyDrawBalance}
      srcPrize={require('app/assets/images/luckydraw/prizes.png')}
      targetIndex={targetIndex}
      loopCount={loopCount}
      startAnimate={startAnimate}
      startAnimateWinPrizeFrame={startAnimateWinPrizeFrame}
      isLoading={isLoading}
      setLoading={setLoading}
      onClose={handleClose}
      onSpin={spin}
      onTnc={handleNavigateTnc}
      dimension={dimension}
    />
  )
}
