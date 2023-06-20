import { useAppSelector } from 'app/provider/redux/store'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import React, { useEffect } from 'react'
import { useModal } from 'react-native-modalfy'
import { useDispatch } from 'react-redux'
import { useMessageQuery } from 'services/messageApi'

const MessagePopup = () => {
  const dispatch = useDispatch()
  const { openModal } = useModal()
  const { count } = useMessageQuery(undefined, {
    selectFromResult: ({ data }) => ({
      count: data?.data?.count,
    }),
    refetchOnMountOrArgChange: true,
  })

  const isLoggedIn = useAppSelector((s) => !!s.auth.info)
  const showPopup = useAppSelector((s) => s.tempSetting.triggerPopupEvent)

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if (isLoggedIn && showPopup && count && count > 0) {
        openModal('MessagePopupModal')
        dispatch(TempSettingActions.toggleTriggerPopupMessage(false))
      }
    }, 1000)

    return () => {
      clearTimeout(setTimeoutId)
    }
  }, [count])

  return <></>
}

export default MessagePopup
