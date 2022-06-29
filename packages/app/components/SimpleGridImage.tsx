import { GAMES } from 'app/config/games/games.type'
import { HOME_PADDING } from 'app/constant/sizes'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'
import BouncePressable from 'app/pressable/BouncePressable'
import { GameLauncherActions } from 'app/store/gameLauncher.slice'
import { Image, styled, Text, View } from 'dripsy'
import { FC } from 'react'
import { useDispatch } from 'react-redux'

interface GamesProps extends GAMES {
  showTitle: boolean
}

const SimpleGridImage: FC<
  GamesProps & {
    context: ContextualModuleKey
  }
> = ({
  gameCode,
  gameName,
  title,
  image,
  providerCode,
  showTitle,
  context,
}) => {
  const { width, height } = useContainerDimension()
  const borderedWidth = width - 4
  const leftRightSpace = borderedWidth * HOME_PADDING * 0.5
  const columnWidth = (borderedWidth - leftRightSpace * 2) / 2
  const dispatch = useDispatch()
  const urlImage = typeof image == 'string' && image.indexOf('http') > -1
  const img = urlImage ? { uri: image } : image
  return (
    <BouncePressable
      sx={{ p: leftRightSpace, width: columnWidth }}
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
          width: columnWidth - leftRightSpace * 2,
          height: columnWidth - leftRightSpace * 2,
          borderRadius: 10,
        }}
      />
      {title && showTitle && (
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

export default SimpleGridImage
