import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { LaunchGame } from 'app/features/game/GameLauncher'
import { Pressable, SxProp, View } from 'dripsy'
import React from 'react'
import { PressableProps } from 'react-native'
import { FeaturedGame } from 'services/gameApi.type'
import { SolitoImage } from 'solito/image'

interface TopGameCardProps extends PressableProps {
  game: FeaturedGame
  desktopMode?: boolean
  sx?: SxProp
}

export default function TopGameCard({
  game,
  desktopMode,
  sx,
  ...props
}: TopGameCardProps) {
  // const
  function onPress() {
    LaunchGame({
      ...game,
      desktopMode,
    })
  }

  return (
    <Pressable sx={sx} onPress={onPress} {...props}>
      <View
        sx={{
          width: [70, 100, 120],
          aspectRatio: 170 / 350,
          // borderRadius: 15,
          overflow: 'hidden',
        }}
      >
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${game.xImg.replace(
            '{gameProviderCode}',
            '%7BgameProviderCode%7D'
          )}`}
          fill
          alt={game.gpc}
          resizeMode="cover"
        />
      </View>
      {/* <PaginationItem>{number}</PaginationItem> */}
    </Pressable>
  )
}

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
