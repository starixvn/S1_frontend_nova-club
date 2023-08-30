import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { LaunchGame } from 'app/features/game/GameLauncher'
import useLocalization from 'app/provider/localization'
import { SxProp, Text, View, styled, useResponsiveValue } from 'dripsy'
import { MotiPressable } from 'moti/interactions'
import React, { useMemo } from 'react'
import { FeaturedGame } from 'services/gameApi.type'
import { SolitoImage } from 'solito/image'

interface TopGameCardProps {
  game: FeaturedGame
  isOnGoing?: boolean
  desktopMode?: boolean
  sx?: SxProp
}

export const width = [70, 100, 120]
export const aspectRatio = 0.485 //170 / 350

export const height = width.map((w) => w / aspectRatio)

export default function TopGameCard({
  game,
  isOnGoing,
  desktopMode,
  sx,
}: TopGameCardProps) {
  const { t } = useLocalization()
  const labelWidth = useResponsiveValue([55, 70])

  function onPress() {
    LaunchGame({
      ...game,
      desktopMode,
    })
  }

  return (
    <Root
      sx={sx}
      onPress={onPress}
      animate={useMemo(
        () =>
          ({ hovered, pressed }) => {
            'worklet'

            return {
              translateY: hovered ? -5 : 0,
            }
          },
        []
      )}
    >
      <View
        sx={{
          width,
          aspectRatio,
          overflow: 'hidden',
        }}
      >
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${game.xImg}`}
          fill
          alt={game.gpc}
          resizeMode="cover"
        />
        {isOnGoing && (
          <View
            sx={{
              width: labelWidth,
              px: [10, 12],
              aspectRatio: 1,
              textAlign: 'center',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              ml: -labelWidth / 2,
              mt: -labelWidth / 2,
              bg: '#45d03b',
              transform: [{ rotate: '315deg' }],
            }}
          >
            <Text sx={{ fontSize: [7, 9] }}>{t('home.ongoing')}</Text>
          </View>
        )}
      </View>
    </Root>
  )
}

const Root = styled(MotiPressable)({
  position: 'relative',
  // aspectRatio: 1,
  overflow: 'hidden',
})

// const PaginationItem = ({ children }) => {
//   return (
//     <View
//       sx={{
//         position: 'absolute',
//         left: '10%',
//         top: '-1.5%',
//         bg: '$error',
//         zIndex: 1,
//         width: '30%',
//         borderBottomRightRadius: 50,
//         borderBottomLeftRadius: 50,
//         aspectRatio: 36 / 48,
//         boxShadow: 'md',
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}
//     >
//       <DripsyGradient
//         colors={['$otp', '$transparentWhite']}
//         sx={{
//           opacity: 0.5,
//           position: 'absolute',
//           top: 0,
//           zIndex: 2,
//           width: '100%',
//           height: 10,
//         }}
//       />
//       <Text
//         sx={{ fontSize: [16, 18], color: '$secondary.100', fontWeight: 'bold' }}
//       >
//         {children}
//       </Text>
//     </View>
//   )
// }
