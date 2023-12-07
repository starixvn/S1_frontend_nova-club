import { useAppDispatch } from 'app/provider/redux/store'
import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'
import { contentApi } from 'services/contentApi'
import { useHomeEvent } from '../../HomeEventProvider'
type Props = {}

const EventPopUpPriority = 0
export default function EventPopUpTrigger({}: Props) {
  const { addResult } = useHomeEvent()

  const dispatch = useAppDispatch()

  async function filterAppearingBanners() {
    const popups = await dispatch(contentApi.endpoints.banner.initiate())
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
  }

  useEffect(() => {
    filterAppearingBanners()
  }, [])

  return null
}

const LazyContent = dynamic(() => import('./Content'))
