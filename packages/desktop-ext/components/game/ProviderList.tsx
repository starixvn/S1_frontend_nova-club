import { ProviderColorImageMapping } from 'app/constants/gameAssets'
import { Pressable, View } from 'dripsy'
import React from 'react'
import { SolitoImage } from 'solito/image'
type Props = {}

export default function ProviderList({
  data,
  onNavigateProvider,
  ...rest
}: Props) {
  return (
    <View sx={{ gap: '$3', width: [175, 175, 175, 175, 200] }} {...rest}>
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
            <SolitoImage fill src={ProviderColorImageMapping[gpc]} alt={gpc} />
          </Pressable>
        )
      })}
    </View>
  )
}
