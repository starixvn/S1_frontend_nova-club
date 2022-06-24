import { HOME_PADDING } from 'app/constant/sizes'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useContextualRouting from 'app/hooks/useContextualRouting'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'
import BouncePressable from 'app/pressable/BouncePressable'
import { Image } from 'dripsy'
import { useRouter } from 'solito/router'
import { DraggableScrollView } from './DraggableScrollView'

const ListImage = ({ data }: { data: any[] }) => {
  const { width, height } = useContainerDimension()
  const borderedWidth = width - 4
  const leftRightSpace = borderedWidth * HOME_PADDING * 0.75
  const columnWidth = (borderedWidth - leftRightSpace * 2) / 3

  const { push } = useRouter()
  const { makeContextualHref } = useContextualRouting(ContextualModuleKey.Game)
  const to = makeContextualHref('prelaunchgame')
  return (
    <DraggableScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ marginHorizontal: leftRightSpace }}
    >
      {data.map((i) => {
        return (
          <BouncePressable
            key={i.image.toString()}
            onPress={() => {
              // push(to, '/games/prelaunchgame')
            }}
          >
            <Image
              source={i.image}
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
