import BannerCarousel from 'app/components/banner/BannerCarousel'
import React from 'react'
import { useBannerQuery } from 'services/contentApi'
import { usePlayerProfileQuery } from 'services/playerApi'

export default function BannerSection() {
  const { currency } = usePlayerProfileQuery()

  const { data } = useBannerQuery({ currency })
  const bannerList = data?.filter((el) => el.banner_display_page === 'main')

  return <BannerCarousel data={bannerList} />
}
