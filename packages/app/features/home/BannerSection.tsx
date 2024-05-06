import BannerCarousel from 'app/components/banner/BannerCarousel'
import useFocusedSelector from 'app/hooks/useFocusedSelector'
import React from 'react'
import { selectBannerByPage, useBannerQuery } from 'services/contentApi'
import { BannerPage } from 'services/contentApi.type'

export default function BannerSection() {
  const currency = useFocusedSelector((s) => s.setting.currency)
  const { banners } = useBannerQuery(currency, {
    selectFromResult: (s) => {
      return {
        ...s,
        banners: selectBannerByPage(s.data, BannerPage.Main),
      }
    },
  })

  if (!banners || banners.length <= 0) return null

  return <BannerCarousel data={banners} />
}
