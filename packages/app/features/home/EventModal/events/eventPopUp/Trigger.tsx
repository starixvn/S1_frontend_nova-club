import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'
import { contentApi } from 'services/contentApi'
import { BannerPage } from 'services/contentApi.type'
import { usePlayerProfileQuery } from 'services/playerApi'
import { useHomeEvent } from '../../HomeEventProvider'
type Props = {}

const EventPopUpPriority = 0
const EventPopUpSource = 'EventPopUp'
export default function EventPopUpTrigger({}: Props) {
  const currency = useAppSelector((s) => s.setting.currency)
  const { data } = usePlayerProfileQuery()
  const { addResult, flagCompletedChecking } = useHomeEvent()

  const dispatch = useAppDispatch()

  async function filterAppearingBanners() {
    try {
      const popups = await dispatch(
        contentApi.endpoints.banner.initiate(currency)
      )
        .unwrap()
        .then((r) =>
          r.filter((b) => b.banner_display_page === BannerPage.Popup)
        )

      if (popups && popups.length > 0) {
        let result = popups

        if (data && data?.vip_level <= 0)
          result = popups.filter((el) => el.banner_name !== 'Pop up - VIP')

        addResult(
          result.map((p, i) => ({
            // tnc: () => {},
            content: () => <LazyContent data={p} />,
            priority: p.banner_seq,
          }))
        )
      }
    } catch (e) {
      console.log('Check Event Pop Up Error', e)
    }

    flagCompletedChecking(EventPopUpSource)
  }

  useEffect(() => {
    data && filterAppearingBanners()
  }, [data])

  return null
}

const LazyContent = dynamic(() => import('./Content'))
