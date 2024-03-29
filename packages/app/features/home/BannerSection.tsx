import BannerCarousel from 'app/components/banner/BannerCarousel'
import { useAppSelector } from 'app/provider/redux/store'
import React, { useMemo } from 'react'
import { selectBannerByPage, useBannerQuery } from 'services/contentApi'
import { BannerPage } from 'services/contentApi.type'

export default function BannerSection() {
  const currency = useAppSelector((s) => s.setting.currency)
  const { banners } = useBannerQuery(currency, {
    selectFromResult: (s) => {
      return {
        ...s,
        banners: selectBannerByPage(s.data, BannerPage.Main),
      }
    },
  })

  return <BannerCarousel data={banners} />
}
