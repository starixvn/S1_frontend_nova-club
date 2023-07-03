import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { Pressable, View } from 'dripsy'
import React from 'react'
import { SolitoImage } from 'solito/image'
type Props = {}

export default function ProviderList({
  data,
  onNavigateProvider,
  imageCategory,
  children,
  ...rest
}: Props) {
  return (
    <View sx={{ gap: '$3', width: [175, 175, 175, 175, 200] }} {...rest}>
      {children}
      {data.map((gpc, i) => {
        return (
          <Pressable
            key={i}
            onPress={() => onNavigateProvider(i, gpc)}
            sx={{
              width: [175, 175, 175, 175, 200],
              aspectRatio: 240 / 80,
            }}
          >
            <SolitoImage
              fill
              src={`${MEDIA_DOMAIN}${CONTENT_URI}/v2/game/provider/colored/${imageCategory}/${gpc?.toLowerCase()}.jpg`}
              alt={gpc}
            />
          </Pressable>
        )
      })}
    </View>
  )
}
