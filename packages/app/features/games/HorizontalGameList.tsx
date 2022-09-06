import { DraggableScrollView } from 'app/components/DraggableScrollView'
import SimpleGridImage from 'app/components/SimpleGridImage'
import { HOME_PADDING } from 'app/constant/sizes'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { useAppSelector } from 'app/provider/redux/store'
import { useDispatch } from 'react-redux'
import { Game } from 'services/contentApi.type'

const HorizontalGameList = ({ data }: { data: Game[] }) => {
  const { width, height } = useContainerDimension()
  const borderedWidth = width - 4
  const leftRightSpace = borderedWidth * HOME_PADDING
  const columnWidth = Math.min((borderedWidth - leftRightSpace * 2) / 4.5, 120)

  const locale = useAppSelector((s) => s.setting.locale)

  return (
    <DraggableScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: leftRightSpace,
      }}
    >
      {data.map((item, index) => {
        const { gc, gpc, gtc, img, name } = item

        const formattedName = name
          ? typeof name === 'string'
            ? name
            : name[locale]
          : undefined

        return (
          <SimpleGridImage
            gameCode={gc}
            providerCode={gpc}
            key={`${gc + gpc}${index}`}
            image={img}
            width={columnWidth}
            sx={{ mr: leftRightSpace * 0.5 }}
            gameType={gtc}
            gameName={formattedName}
          />
        )
      })}
    </DraggableScrollView>
  )
}

export default HorizontalGameList
