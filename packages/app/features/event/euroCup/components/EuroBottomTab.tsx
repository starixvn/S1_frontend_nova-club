import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import usePathname from 'app/hooks/usePathname'
import { EURO_BOTTOM_ROUTE } from 'app/navigation/RoutePath'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { Row, View } from 'dripsy'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { SolitoImage } from 'solito/image'
import { useRouter } from 'solito/router'
import EuroTabIcon from './EuroTabIcon'

const EuroBottomTab = () => {
  const pathname = usePathname()
  const { push, replace } = useRouter()
  const { bottom } = useSafeArea()
  const { width } = useWindowDimensions()

  const isActiveState = (path: string) => {
    const isSamePath = pathname.includes(path)

    return isSamePath
  }

  return (
    <View
      sx={{
        // position: 'absolute',
        // bottom: 0,
        // left: 0,
        // right: 0,
        // bg: '#153CDB',
        bg: 'transparent',
        alignItems: 'center',
      }}
    >
      <View sx={{ position: 'absolute', bottom: 0 }} pointerEvents="none">
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/bottom-bar-bg.png`}
          alt=""
          width={width}
          // height={width * (330 / 1080)}
          height={200}
          contentFit="cover"
          contentPosition="bottom center"
          // style={{ backgroundColor: 'white' }}
        />
      </View>
      <Row sx={{ maxWidth: 798, width: '100%', mb: 24 }}>
        {EURO_BOTTOM_ROUTE.map((route) => {
          return (
            <EuroTabIcon
              key={route.label}
              sx={{ flex: 1 }}
              active={isActiveState(route.path)}
              label={route.label}
              size={100}
              icon={route.icon ?? 'notice'}
              onPress={() => replace(route.path ?? '/')}
            />
          )
        })}
      </Row>
    </View>
  )
}

export default EuroBottomTab
