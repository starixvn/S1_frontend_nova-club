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
        .then((r) => r.data?.list)

      if (isEligible) {
        if (isEligible.some((e) => e.event_code === 'retention3'))
          handleTriggerEvent('retention3')
        else if (isEligible.some((e) => e.event_code === 'retention4'))
          handleTriggerEvent('retention4')
        else if (isEligible.some((e) => e.event_code === 'retention5'))
          handleTriggerEvent('retention5')
        else if (isEligible.some((e) => e.event_code === 'retention6'))
          handleTriggerEvent('retention6')
      }
    } catch (e) {
      console.log('Check Retention 3  Error', e)
    }

    flagCompletedChecking(EventSource)
  }

  const handleTriggerEvent = (code) => {
    addResult({
      tnc: () => {
        push('/event/retention3/tnc')
      },
      content: () => <LazyContent code={code} />,
      priority: EventPriority,
    })
  }

  useEffect(() => {
    checkEligible()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

const LazyContent = dynamic(() => import('./Content'))
