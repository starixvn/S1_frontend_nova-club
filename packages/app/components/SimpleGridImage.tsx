import { Gradient } from '@dripsy/gradient'
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
import SimpleGridImageButton from './SimpleGridImageButton'
interface GamesProps extends LaunchGamePayload {
  width: number
  height?: number
  sx?: SxProp
  isHotGame?: boolean
  isNewGame?: boolean
  showName?: boolean
  showPlaynow?: boolean
  skeleton?: boolean
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
  skeleton,
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
          skeleton={skeleton}
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
              <SimpleGridImageButton
                colors={['#62eff9', '#d1fdfc', '#1b9c98']}
                label={t('common.playNow')}
                sx={{ borderColor: 'white', mb: desktopMode ? '8%' : 0 }}
                textStyle={{
                  color: '#062440',
                  textShadowColor: 'rgba(255, 255, 255, 0.45)',
                }}
                onPress={() => {
                  dispatch(GameLauncherActions.launchGame(gamePayload))
                }}
              />
            )}
            {desktopMode && (
              <SimpleGridImageButton
                colors={['#eacd31', '#b35e11', '#dcb413']}
                label={t('common.desktop')}
                sx={{ borderColor: '#ffdd01' }}
                textStyle={{
                  color: 'white',
                  textShadowColor: 'rgba(0, 0, 0, 0.45)',
                }}
                onPress={() => {
                  dispatch(
                    GameLauncherActions.launchGame({
                      ...gamePayload,
                      desktopMode,
                    })
                  )
                }}
              />
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
            top: '-15%',
            right: '-10%',
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
              width: width * 0.4,
              aspectRatio: 1,
            }}
          />
        </MotiView>
      )}
      {isNewGame && (
        <Image
          resizeMode="contain"
          source={require('../assets/images/games/common/icon-new.png')}
          style={{
            width: width * 0.5,
            aspectRatio: 130 / 78,
            position: 'absolute',
            top: '3%',
            left: '-6%',
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
  bottom: '6%',
}))

export default memo(SimpleGridImage)
