import { GAMES } from 'app/config/games/games.type'
import { HOME_PADDING } from 'app/constant/sizes'
import useContainerDimension from 'app/hooks/useContainerDimension'
import BouncePressable from 'app/pressable/BouncePressable'
import useLocalization from 'app/provider/localization'
import { GameLauncherActions } from 'app/store/gameLauncher.slice'
import { Image, styled, SxProp, Text, View } from 'dripsy'
import { FC, memo } from 'react'
import { TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import Icon from './Icon'

type GamesProps = Omit<GAMES, 'gameName'> & {
  width: number
  height?: number
  sx?: SxProp
  desktop?: boolean
  isHotGame?: boolean
  isNewGame?: boolean
}

export const GAME_IMAGE_RATIO = 325 / 315

const SimpleGridImage: FC<GamesProps> = ({
  gameCode,
  title,
  image,
  providerCode,
  width,
  height,
  sx,
  desktop,
  isHotGame,
  isNewGame,
}) => {
  const dispatch = useDispatch()
  const urlImage = typeof image == 'string' && image.indexOf('http') > -1
  const img = urlImage ? { uri: image } : image
  const { t } = useLocalization()
  return (
    <View>
      <BouncePressable
        sx={{ width, position: 'relative', ...sx }}
        onPress={() => {
          dispatch(
            GameLauncherActions.launchGame({
              gameCode: gameCode,
              providerCode: providerCode,
              image,
              gameName: title,
            })
          )
        }}
      >
        <Image
          resizeMode="contain"
          source={img}
          sx={{
            width,
            height: height ?? width / GAME_IMAGE_RATIO,
            borderRadius: 10,
          }}
        />
        {title && (
          <Text
            sx={{
              textAlign: 'center',
              mt: '$1',
              color: '$lightNavyBlue',
              fontSize: 15,
            }}
          >
            {t(title)}
          </Text>
        )}
      </BouncePressable>
      {desktop && (
        <DesktopMode
          onPress={() => {
            dispatch(
              GameLauncherActions.launchGame({
                gameCode: gameCode,
                providerCode: providerCode,
                desktopMode: true,
                image,
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
        <Image
          resizeMode="contain"
          source={require('../assets/images/games/common/icon-hot.png')}
          sx={{
            width: width * 0.5,
            height: (height ?? width / GAME_IMAGE_RATIO) * 0.5,
            position: 'absolute',
            top: -10,
            left: -10,
          }}
        />
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
  top: '55%',
  backgroundColor: 'white',
  flexDirection: 'row',
  alignItems: 'center',
}))

export default memo(SimpleGridImage)
