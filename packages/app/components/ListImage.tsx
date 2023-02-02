import { HOME_PADDING } from 'app/constant/sizes'
import { LaunchGame } from 'app/features/games/GameLauncher'
import useContainerDimension from 'app/hooks/useContainerDimension'
import BouncePressable from 'app/pressable/BouncePressable'
import { Image } from 'dripsy'
import { useDispatch } from 'react-redux'
import { GameConfig } from 'services/contentApi.type'
import { DraggableScrollView } from './DraggableScrollView'

const ListImage = ({ data }: { data: GameConfig[] }) => {
  const { width, height } = useContainerDimension()
  const borderedWidth = width - 4
  const leftRightSpace = borderedWidth * HOME_PADDING * 0.75
  const columnWidth = (borderedWidth - leftRightSpace * 2) / 3
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
        return (
          <BouncePressable
            key={item.game_code + `'${index}'`}
            onPress={() => {
              LaunchGame({
                gameCode: item.game_code,
                providerCode: item.game_provider_code,
                image: item.image,
              })
            }}
          >
            <Image
              source={item.image}
              sx={{
                borderRadius: 5,
                width: columnWidth - leftRightSpace,
                height: columnWidth - leftRightSpace,
              }}
            />
          </BouncePressable>
        )
      })}
    </DraggableScrollView>
  )
}

export default ListImage
