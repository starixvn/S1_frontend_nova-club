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

type GamesProps = GAMES & {
  width: number
  height?: number
  sx: SxProp
  desktop?: boolean
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
  top: '65%',
  backgroundColor: 'white',
  flexDirection: 'row',
  alignItems: 'center',
}))

export default memo(SimpleGridImage)
