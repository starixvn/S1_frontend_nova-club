import BannerCarousel from 'app/components/banner/BannerCarousel'
import HomeBannerCarousel from 'app/components/banner/HomeBannerCarousel'
import React from 'react'
import { useBannerQuery } from 'services/contentApi'

export default function BannerSection() {
  //   return <Banner />

  const { data } = useBannerQuery()

  return <HomeBannerCarousel data={data} sx={{}} />
}
