import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { GAME_TYPE_CODE, ProviderImageCategory } from 'app/utils/constant'
import { Pressable, View } from 'dripsy'
import React, { Dispatch, SetStateAction } from 'react'
import { ViewProps } from 'react-native'
import { SolitoImage } from 'solito/image'
interface ProviderListProps extends ViewProps {
  data: {
    gtc: GAME_TYPE_CODE
    gpc: string
  }[]
  children?: React.ReactNode
  imageCategory: ProviderImageCategory
  onNavigateProvider: (index: number, gpc: string) => void
  provider?: string
  handleProvider: Dispatch<SetStateAction<string>>
}

export default function ProviderList({
  data,
  onNavigateProvider,
  imageCategory,
  children,
  provider,
  handleProvider,
  ...rest
}: ProviderListProps) {
  return (
    <View sx={{ gap: '$2', width: [175, 175, 175, 150] }} {...rest}>
      {children}
      {data.map((g, i) => {
        const isActive = g.gpc === provider?.toUpperCase()
        return (
          <Pressable
            key={i}
            onPress={() => {
              onNavigateProvider(i, g.gpc)
              handleProvider(g.gpc.toUpperCase())
            }}
            sx={{
              width: [175, 175, 175, 150],
              aspectRatio: 230 / 80,
              overflow: 'hidden',
              borderWidth: 2,
              borderColor: isActive ? '$secondary.200' : 'transparent',
            }}
          >
            <div
              className="btn btn-hover"
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                zIndex: 1,
              }}
            />
            <SolitoImage
              fill
              src={`${MEDIA_DOMAIN}${CONTENT_URI}/v2/game/provider/colored/${imageCategory}/${g.gpc?.toLowerCase()}.jpg`}
              alt={g.gpc}
            />
          </Pressable>
        )
      })}
    </View>
  )
}
