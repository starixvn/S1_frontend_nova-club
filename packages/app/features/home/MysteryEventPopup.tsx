import { useAppSelector } from 'app/provider/redux/store'
import React, { useEffect } from 'react'
import { useModal } from 'react-native-modalfy'
import { useGetMysteryCheckQuery } from 'services/eventApi'

const MysteryEventPopup = () => {
  const { openModal } = useModal()

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
