import BannerCarousel from 'app/components/banner/BannerCarousel'
import React from 'react'
import { useBannerQuery } from 'services/contentApi'

export default function BannerSection() {
  //   return <Banner />

  const { data } = useBannerQuery()
  const bannerList = data?.filter((el) => el.banner_display_page === 'main')

  return <BannerCarousel data={bannerList} />
}
