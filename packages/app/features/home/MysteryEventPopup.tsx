import { useAppSelector } from 'app/provider/redux/store'
import React, { useEffect } from 'react'
import { useModal } from 'react-native-modalfy'
import { useDispatch } from 'react-redux'
import { useGetMysteryCheckQuery } from 'services/eventApi'

const MysteryEventPopup = () => {
  const dispatch = useDispatch()
  const { openModal, closeModal, currentModal } = useModal()

  const isLoggedIn = useAppSelector((s) => !!s.auth.info)
  const showPopup = useAppSelector((s) => s.tempSetting.triggerPopupEvent)
  const showTutorial = useAppSelector((s) => s.setting.triggerPopupTutorial)

  const { data } = useGetMysteryCheckQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: !isLoggedIn,
  })

  useEffect(() => {
    let openMysteryModalInstance: NodeJS.Timeout

    if (isLoggedIn && !showTutorial && data?.data?.key) {
      if (currentModal === 'MysteryModal') {
        closeModal('MysteryModal')
      }

      openMysteryModalInstance = setTimeout(() => {
        openModal('MysteryModal')
      }, 1000)
    }

    return () => {
      clearTimeout(openMysteryModalInstance)
    }
  }, [isLoggedIn, data, showPopup, showTutorial])

  return <></>
}

export default MysteryEventPopup
