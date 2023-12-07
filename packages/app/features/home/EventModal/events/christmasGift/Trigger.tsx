import { useAppDispatch } from 'app/provider/redux/store'
import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'
import { rewardApi } from 'services/rewardApi'
import { useHomeEvent } from '../../HomeEventProvider'
type Props = {}

const ChristmasGiftPriority = 20
// type UseQueryStateType = ReturnType<typeof useGetEligibleEventCoinQuery>

export default function ChristmasGiftTrigger({}: Props) {
  const { addResult } = useHomeEvent()

  const dispatch = useAppDispatch()

  async function checkEligible() {
    const isEligible = await dispatch(
      rewardApi.endpoints.getEligibleEventCoin.initiate()
    )
      .unwrap()
      .then((r) => !r.data?.list?.some((e) => e.event_code === 'upload2'))

    if (isEligible)
      addResult({
        content: () => <LazyContent />,
        priority: ChristmasGiftPriority,
      })
  }

  useEffect(() => {
    checkEligible()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

const LazyContent = dynamic(() => import('./Content'))
