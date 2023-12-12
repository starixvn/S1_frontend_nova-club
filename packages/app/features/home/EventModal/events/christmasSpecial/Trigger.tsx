import { useAppDispatch } from 'app/provider/redux/store'
import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'
import { rewardApi } from 'services/rewardApi'
import { useHomeEvent } from '../../HomeEventProvider'
import { useRouter } from 'solito/router'
type Props = {}

const ChristmasSpecialPriority = 21
const ChristmasSpecialSource = 'ChristmasSpecial'

export default function ChristmasSpecialTrigger({}: Props) {
  const { addResult, flagCompletedChecking } = useHomeEvent()
  const { push } = useRouter()

  const dispatch = useAppDispatch()

  async function checkEligible() {
    const isEligible = await dispatch(
      rewardApi.endpoints.getChristmasEventCoin.initiate()
    ).unwrap()

    if (isEligible)
      addResult({
        tnc: () => {
          push('/event/christmas-special/tnc')
        },
        content: () => <LazyContent />,
        priority: ChristmasSpecialPriority,
      })

    flagCompletedChecking(ChristmasSpecialSource)
  }

  useEffect(() => {
    checkEligible()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

const LazyContent = dynamic(() => import('./Content'))
