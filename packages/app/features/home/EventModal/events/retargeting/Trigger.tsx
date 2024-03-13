import { useAppDispatch } from 'app/provider/redux/store'
import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'
import { playerApi } from 'services/playerApi'
import { useRouter } from 'solito/router'
import { useHomeEvent } from '../../HomeEventProvider'
type Props = {}

const EventPriority = 40
const EventSource = 'Retargeting'
// type UseQueryStateType = ReturnType<typeof useGetEligibleEventCoinQuery>

export default function RetargetingTrigger({}: Props) {
  const { addResult, flagCompletedChecking } = useHomeEvent()
  const { push } = useRouter()

  const dispatch = useAppDispatch()

  async function checkEligible() {
    try {
      const isEligible = await dispatch(
        playerApi.endpoints.eligibleSpin.initiate(undefined, {
          forceRefetch: true,
        })
      )
        .unwrap()
        .then((r) => {
          const event = r.data?.details?.find(
            (el) => el.event_type === 'registration'
          )

          return event?.wheel_info.totalBalance ?? 0 > 0
        })

      if (isEligible)
        addResult({
          tnc: () => {
            push('/event/retargeting/tnc')
          },
          content: () => <LazyContent />,
          priority: EventPriority,
        })
    } catch (e) {
      console.log('Check Retargeting Error', e)
    }

    flagCompletedChecking(EventSource)
  }

  useEffect(() => {
    checkEligible()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

const LazyContent = dynamic(() => import('./Content'))
