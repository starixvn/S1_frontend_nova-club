import { GAMES } from 'app/config/games/games.type'
import { HOME_PADDING } from 'app/constant/sizes'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'
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
  context: ContextualModuleKey
  sx: SxProp
  desktop?: boolean
}

export const GAME_IMAGE_RATIO = 325 / 315

const SimpleGridImage: FC<GamesProps> = ({
  gameCode,
  title,
  image,
  providerCode,
  context,
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
              context,
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
                context,
              })
            )
          }}
        >
          <View sx={{ bg: 'red' }}>
            <Icon name="sl" />
          </View>
          <Text sx={{ fontSize: 12, color: 'red', mx: '$2' }}>
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
