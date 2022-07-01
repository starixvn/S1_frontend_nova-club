import { GAMES } from 'app/config/games/games.type'
import { HOME_PADDING } from 'app/constant/sizes'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'
import BouncePressable from 'app/pressable/BouncePressable'
import { GameLauncherActions } from 'app/store/gameLauncher.slice'
import { Image, styled, SxProp, Text, View } from 'dripsy'
import { FC, memo } from 'react'
import { useDispatch } from 'react-redux'

type GamesProps = GAMES & {
  width: number
  height?: number
  context: ContextualModuleKey
  sx: SxProp
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
}) => {
  const dispatch = useDispatch()
  const urlImage = typeof image == 'string' && image.indexOf('http') > -1
  const img = urlImage ? { uri: image } : image
  return (
    <BouncePressable
      sx={sx}
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
        resizeMode="cover"
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
          {title}
        </Text>
      )}
    </BouncePressable>
  )
}

export default memo(SimpleGridImage)
