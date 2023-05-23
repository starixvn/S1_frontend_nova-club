import React from 'react'
import { useWindowDimensions } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { BannerResult } from 'services/contentApi.type'
import { SolitoImage } from 'solito/image'

export default function Banner({ data }: { data: BannerResult[] }) {
  const width = useWindowDimensions().width
  const height = width / (768 / 350)

  return (
    <>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={data}
        scrollAnimationDuration={1000}
        // onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={({ item }) => (
          <SolitoImage
            src={`https://static.zzspeed.site/nvclub/nova-club/content/banners/${item.image}`}
            height={height}
            width={width}
            alt={item.alt ?? ''}
          />
        )}
      />
    </>
  )
}
