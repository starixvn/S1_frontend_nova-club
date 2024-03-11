import { useAppDispatch } from 'app/provider/redux/store'
import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'
import { contentApi } from 'services/contentApi'
import { useHomeEvent } from '../../HomeEventProvider'
import { usePlayerProfileQuery } from 'services/playerApi'
type Props = {}

const EventPopUpPriority = 0
const EventPopUpSource = 'EventPopUp'
export default function EventPopUpTrigger({}: Props) {
  const { currency } = usePlayerProfileQuery()
  const { addResult, flagCompletedChecking } = useHomeEvent()

  const dispatch = useAppDispatch()

  async function filterAppearingBanners() {
    try {
      const popups = await dispatch(
        contentApi.endpoints.banner.initiate({ currency })
      )
        .unwrap()
        .then((r) => r.filter((b) => b.banner_display_page === 'popup'))

      if (popups && popups.length > 0) {
        addResult(
          popups.map((p, i) => ({
            // tnc: () => {},
            content: () => <LazyContent data={p} />,
            priority: EventPopUpPriority + i,
          }))
        )
      }
    } catch (e) {
      console.log('Check Event Pop Up Error', e)
    }

    flagCompletedChecking(EventPopUpSource)
  }

  useEffect(() => {
    filterAppearingBanners()
  }, [])

  return null
}

const LazyContent = dynamic(() => import('./Content'))
