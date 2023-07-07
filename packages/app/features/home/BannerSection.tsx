import BannerCarousel from 'app/components/banner/BannerCarousel'
import React from 'react'
import { useBannerQuery } from 'services/contentApi'

export default function BannerSection() {
  //   return <Banner />

  const { data } = useBannerQuery()

  return <BannerCarousel data={data} sx={{}} />
}
