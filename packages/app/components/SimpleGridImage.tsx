import useLocalization from 'app/provider/localization'
import {
  GameLauncherActions,
  LaunchGamePayload,
} from 'app/store/gameLauncher.slice'
import { GAME_TYPE_CODE } from 'app/utils/constant'
import { styled, SxProp, Text, useSx, View } from 'dripsy'
import { MotiView } from 'moti'
import React, { FC, memo } from 'react'
import { TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import GameFrame from '../assets/images/games/games_frame.png'
import Image from './common/Image'
import Icon from './Icon'
interface GamesProps extends LaunchGamePayload {
  width: number
  height?: number
  sx?: SxProp
  isHotGame?: boolean
  isNewGame?: boolean
  showName?: boolean
}

export const GAME_IMAGE_RATIO = 325 / 315

const SimpleGridImage: FC<GamesProps> = ({
  showName,
  gameName,
  gameCode,
  gameType,
  image,
  providerCode,
  width,
  height,
  sx,
  desktopMode,
  isHotGame,
  isNewGame,
}) => {
  // const [isLoaded, setLoaded] = useState(false)
  const dispatch = useDispatch()
  const _sx = useSx()
  const urlImage = typeof image == 'string' && image.indexOf('http') > -1
  const img = urlImage ? { uri: image } : image
  const { t } = useLocalization()
  const gamePayload = {
    gameCode,
    providerCode,
    image,
    gameName,
    gameType,
  }
  // useEffect(() => {
  //   setLoaded(false)
  // }, [image])
  return (
    <View sx={sx}>
      <TouchableOpacity
        style={_sx({ width, position: 'relative' })}
        onPress={() => {
          console.log('gamePayload', gamePayload)
          dispatch(GameLauncherActions.launchGame(gamePayload))
        }}
      >
        <MotiView
          key={image}
          delay={Math.random() * 150}
          from={{
            scale: 0.1,
            opacity: 0.2,
            translateY: Math.random() * 40 + 50,
          }}
          animate={{ scale: 1, opacity: 1, translateY: 0 }}
          transition={{ damping: 10, mass: 0.75 }}
        >
          <Image
            // onLoad={() => setLoaded(true)}
            resizeMode={'contain'}
            source={img}
            style={{
              width,
              height: height ?? width / GAME_IMAGE_RATIO,
              borderRadius: 10,
            }}
          />
          {gameType === GAME_TYPE_CODE.SLOTS && (
            <Image
              source={GameFrame}
              resizeMode={'stretch'}
              style={{
                position: 'absolute',
                zIndex: 1,
                width,
                height: height ?? width / GAME_IMAGE_RATIO,
                borderRadius: 4,
              }}
            />
          )}
        </MotiView>
      </TouchableOpacity>
      {showName && (
        <Text
          numberOfLines={1}
          sx={{
            textAlign: 'center',
            color: '$lightNavyBlue',
            fontSize: 15,
            lineHeight: 20,
          }}
        >
          {t(gameName)}
        </Text>
      )}
      {desktopMode && (
        <DesktopMode
          onPress={() => {
            dispatch(
              GameLauncherActions.launchGame({
                ...gamePayload,
                desktopMode,
              })
            )
          }}
        >
          <View sx={{ bg: '#e71701', p: '$1a' }}>
            <Icon name="desktop" size={20} />
          </View>
          <Text sx={{ fontSize: 12, color: '#e71701', mx: '$2' }}>
            {t('common.desktop')}
          </Text>
        </DesktopMode>
      )}
      {isHotGame && (
        <MotiView
          style={{
            position: 'absolute',
            top: -20,
            left: -15,
          }}
          key={image}
          delay={1000}
          from={{
            scale: 0.1,
            opacity: 0.2,
            translateY: Math.random() * 40 + 50,
          }}
          animate={{ scale: 1, opacity: 1, translateY: 0 }}
        >
          <Image
            resizeMode="contain"
            source={require('../assets/images/games/common/icon-hot.png')}
            style={{
              width: width * 0.5,
              height: (height ?? width / GAME_IMAGE_RATIO) * 0.5,
            }}
          />
        </MotiView>
      )}
      {isNewGame && (
        <Image
          resizeMode="contain"
          source={require('../assets/images/games/common/icon-new.png')}
          sx={{
            width: width * 0.5,
            height: (height ?? width / GAME_IMAGE_RATIO) * 0.5,
            position: 'absolute',
            top: 0,
            left: -2,
          }}
        />
      )}
    </View>
  )
}

const DesktopMode = styled(TouchableOpacity)(() => ({
  borderRadius: 5,
  borderColor: 'red',
  borderWidth: 2,
  position: 'absolute',
  zIndex: 1,
  alignSelf: 'center',
  right: '10%',
  bottom: 50,
  backgroundColor: 'white',
  flexDirection: 'row',
  alignItems: 'center',
}))

export default memo(SimpleGridImage)
