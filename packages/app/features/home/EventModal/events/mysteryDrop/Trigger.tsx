import { useAppDispatch } from 'app/provider/redux/store'
import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'
import { eventApi } from 'services/eventApi'
import { useRouter } from 'solito/router'
import { useHomeEvent } from '../../HomeEventProvider'
type Props = {}

const MysteryDropPriority = 40
const MysteryDropSource = 'MysteryDrop'
// type UseQueryStateType = ReturnType<typeof useGetEligibleEventCoinQuery>

export default function MysteryDropTrigger({}: Props) {
  const { addResult, flagCompletedChecking } = useHomeEvent()
  const { push } = useRouter()

  const dispatch = useAppDispatch()

  async function checkEligible() {
    try {
      const isEligible = await dispatch(
        eventApi.endpoints.getMysteryCheck.initiate()
      )
        .unwrap()
        .then((r) => r?.data?.key)

      if (isEligible)
        addResult({
          tnc: () => push('/event/mystery-drop'),
          content: () => <LazyContent />,
          priority: MysteryDropPriority,
        })
    } catch (error) {
      console.log('Mystery drop trigger error:', error)
    }

    flagCompletedChecking(MysteryDropSource)
  }

  useEffect(() => {
    checkEligible()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

const LazyContent = dynamic(() => import('./Content'))
