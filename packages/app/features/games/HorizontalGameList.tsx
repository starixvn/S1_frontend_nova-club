import { DraggableScrollView } from 'app/components/DraggableScrollView'
import SimpleGridImage from 'app/components/SimpleGridImage'
import { GAMES } from 'app/config/games/games.type'
import { HOME_PADDING } from 'app/constant/sizes'
import useContainerDimension from 'app/hooks/useContainerDimension'
import BouncePressable from 'app/pressable/BouncePressable'
import { GameLauncherActions } from 'app/store/gameLauncher.slice'
import { Image } from 'dripsy'
import { useDispatch } from 'react-redux'
import { Game, GameConfig } from 'services/contentApi.type'

const HorizontalGameList = ({ data }: { data: Game[] }) => {
  const { width, height } = useContainerDimension()
  const borderedWidth = width - 4
  const leftRightSpace = borderedWidth * HOME_PADDING
  const columnWidth = Math.min((borderedWidth - leftRightSpace * 2) / 4.5, 120)
  const dispatch = useDispatch()

  return (
    <DraggableScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: leftRightSpace,
      }}
    >
      {data.map((item, index) => {
        const { gc, gpc, img } = item
        return (
          <SimpleGridImage
            gameCode={gc}
            providerCode={gpc}
            key={`${gc + gpc}${index}`}
            image={img}
            width={columnWidth}
            sx={{ mr: leftRightSpace * 0.5 }}
          />
        )
      })}
    </DraggableScrollView>
  )
}

export default HorizontalGameList
