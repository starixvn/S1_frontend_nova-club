import { useAppSelector } from 'app/provider/redux/store'
import React, { useEffect } from 'react'
import { useModal } from 'react-native-modalfy'
import { useGetChristmasEventCoinQuery } from 'services/rewardApi'

const ChristmasEventPopup = () => {
  const { openModal } = useModal()
  const isLoggedIn = useAppSelector((s) => !!s.auth.info)
  const { data } = useGetChristmasEventCoinQuery(undefined, {
    skip: !isLoggedIn,
  })

  useEffect(() => {
    data && openModal('ChristmasSpecialEventModal')
  }, [data])

  return <></>
}

export default ChristmasEventPopup
