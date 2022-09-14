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
import Image from './common/Image'
import Gameimage from './GameImage'
interface GamesProps extends LaunchGamePayload {
  width: number
  height?: number
  sx?: SxProp
  isHotGame?: boolean
  isNewGame?: boolean
  showName?: boolean
  showPlaynow?: boolean
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
  showPlaynow,
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
    <View sx={{ ...{ flexShrink: 1 }, ...sx }}>
      <TouchableOpacity
        style={_sx({ width, position: 'relative' })}
        onPress={() => {
          console.log('gamePayload', gamePayload)
          dispatch(GameLauncherActions.launchGame(gamePayload))
        }}
      >
        <Gameimage
          key={image}
          width={width}
          height={height ?? width / GAME_IMAGE_RATIO}
          image={image}
          frame={
            gameType === GAME_TYPE_CODE.SLOTS ||
            gameType === GAME_TYPE_CODE.FISHING
          }
        />
        {/* {gameType === GAME_TYPE_CODE.SLOTS && (
          <Image
            source={Frame}
            resizeMode={'stretch'}
            style={{
              position: 'absolute',
              zIndex: 1,
              width,
              height: height ?? width / GAME_IMAGE_RATIO,
              borderRadius: 4,
            }}
          />
        )} */}

        {(desktopMode || showPlaynow) && (
          <BottomRightSlot>
            {showPlaynow && (
              <TouchableOpacity
                onPress={() => {
                  dispatch(GameLauncherActions.launchGame(gamePayload))
                }}
              >
                <Image
                  resizeMode="contain"
                  source={require('app/assets/images/games/sports/play-now.png')}
                  style={{
                    width: width * 0.5,
                    height: height ?? (width / GAME_IMAGE_RATIO) * 0.14,
                    marginBottom: desktopMode ? 8 : 0,
                  }}
                />
              </TouchableOpacity>
            )}
            {desktopMode && (
              <TouchableOpacity
                onPress={() => {
                  dispatch(
                    GameLauncherActions.launchGame({
                      ...gamePayload,
                      desktopMode,
                    })
                  )
                }}
              >
                <Image
                  resizeMode="contain"
                  source={require('app/assets/images/games/sports/desktop.png')}
                  style={{
                    width: width * 0.5,
                    height: height ?? (width / GAME_IMAGE_RATIO) * 0.14,
                  }}
                />
              </TouchableOpacity>
            )}
          </BottomRightSlot>
        )}
      </TouchableOpacity>
      {showName && (
        <Text
          numberOfLines={2}
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
      {isHotGame && (
        <MotiView
          style={{
            position: 'absolute',
            top: -20,
            left: -15,
          }}
          key={image}
          delay={Math.random() * 500 + 500}
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

const BottomRightSlot = styled(View)(() => ({
  position: 'absolute',
  zIndex: 1,
  alignSelf: 'center',
  right: '5%',
  bottom: 12,
}))

export default memo(SimpleGridImage)
