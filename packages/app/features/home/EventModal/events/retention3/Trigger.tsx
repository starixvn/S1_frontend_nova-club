import { useAppDispatch } from 'app/provider/redux/store'
import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'
import { rewardApi } from 'services/rewardApi'
import { useHomeEvent } from '../../HomeEventProvider'
import { useRouter } from 'solito/router'
type Props = {}

const EventPriority = 30
const EventSource = 'Retention3'

export default function Retention3Trigger({}: Props) {
  const { addResult, flagCompletedChecking } = useHomeEvent()
  const { push } = useRouter()

  const dispatch = useAppDispatch()

  async function checkEligible() {
    try {
      const isEligible = await dispatch(
        rewardApi.endpoints.getEligibleEventCoin.initiate(undefined, {
          forceRefetch: true,
        })
      )
        .unwrap()
        .then((r) => r.data?.list?.some((e) => e.event_code === 'retention3'))

      if (isEligible)
        addResult({
          tnc: () => {
            push('/event/retention3/tnc')
          },
          content: () => <LazyContent />,
          priority: EventPriority,
        })
    } catch (e) {
      console.log('Check Retention 3  Error', e)
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
