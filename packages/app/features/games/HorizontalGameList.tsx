import { DraggableScrollView } from 'app/components/DraggableScrollView'
import SimpleGridImage from 'app/components/SimpleGridImage'
import { HOME_PADDING } from 'app/constant/sizes'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { useAppSelector } from 'app/provider/redux/store'
import { StyleProp, ViewStyle } from 'react-native'
import { Game } from 'services/contentApi.type'
import useSeamlessList from './useSeamlessList'
import RecommendedGamesCard from '../home/Section/RecommendedGamesCard'

const HorizontalGameList = ({
  data,
  containerStyle,
  isRankCard = false,
}: {
  data: Game[]
  containerStyle?: StyleProp<ViewStyle>
  isRankCard?: boolean
}) => {
  const { width, height } = useContainerDimension()
  const borderedWidth = width - 4
  const leftRightSpace = borderedWidth * HOME_PADDING
  const columnWidth = Math.min((borderedWidth - leftRightSpace * 2) / 4.5, 120)

  const locale = useAppSelector((s) => s.setting.locale)
  const { seamlessProviderList } = useSeamlessList()

  return (
    <DraggableScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[
        {
          paddingHorizontal: leftRightSpace,
        },
        containerStyle,
      ]}
    >
      {data.map((item, index) => {
        const { gc, gpc, gtc, img, name } = item

        const formattedName = name
          ? typeof name === 'string'
            ? name
            : name[locale]
          : undefined

        return (
          <>
            {isRankCard ? (
              <RecommendedGamesCard
                key={index}
                image={img}
                number={index + 1}
                gameCode={gc}
                providerCode={gpc}
                gameType={gtc}
                gameName={formattedName}
              />
            ) : (
              <SimpleGridImage
                gameCode={gc}
                providerCode={gpc}
                key={`${gc + gpc}${index}`}
                image={img}
                width={columnWidth}
                sx={{ mr: leftRightSpace * 0.5 }}
                gameType={gtc}
                gameName={formattedName}
                skeleton
                isSeamless={seamlessProviderList.includes(gpc)}
              />
            )}
          </>
        )
      })}
    </DraggableScrollView>
  )
}

export default HorizontalGameList
