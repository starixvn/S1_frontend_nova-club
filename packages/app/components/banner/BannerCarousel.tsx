import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { SxProp, View } from 'dripsy'
import { Skeleton } from 'moti/skeleton'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import Carousel, { TCarouselProps } from 'react-native-reanimated-carousel'
import { BannerResult } from 'services/contentApi.type'
import { SolitoImage } from 'solito/image'

export interface BannerCarouselProps
  extends Omit<TCarouselProps<BannerResult>, 'data' | 'renderItem'> {
  data?: BannerResult[]
  sx?: SxProp
}

export default function BannerCarousel({
  data,
  sx,
  ...rest
}: BannerCarouselProps) {
  const width = useWindowDimensions().width
  const height = width / (768 / 350)

  return (
    <View sx={sx}>
      <Skeleton show={data == null}>
        <Carousel
          loop
          width={width}
          height={height}
          autoPlay={true}
          autoPlayInterval={5000}
          data={data}
          scrollAnimationDuration={1000}
          // onSnapToItem={(index) => console.log('current index:', index)}
          renderItem={({ item }) => (
            <SolitoImage
              src={`${MEDIA_DOMAIN}/${CONTENT_URI}/banners/${item.image}`}
              height={height}
              width={width}
              alt={item.alt ?? ''}
            />
          )}
          {...rest}
        />
      </Skeleton>
    </View>
  )
}
