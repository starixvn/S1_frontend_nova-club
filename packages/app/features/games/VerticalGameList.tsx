import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import SimpleGridImage from 'app/components/SimpleGridImage'
import { LANGUAGE_CODE } from 'app/constant/language'
import useGameGridSize from 'app/hooks/useGameGridSize'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { GAME_TAGS } from 'app/utils/constant'
import { ActivityIndicator, Text, useSx, View } from 'dripsy'
import { AnimatePresence, MotiView } from 'moti'
import { ComponentProps, ComponentType } from 'react'
import { ListRenderItem, FlatList } from 'react-native'
import { Game } from 'services/contentApi.type'

type FlatListProps = Partial<ComponentProps<typeof FlatList>>
type VerticalGameListProps = FlatListProps & {
  games: Game[]
  isLoading?: boolean
  showName?: boolean
}

export default function VerticalGameList({
  games,
  isLoading,
  numColumns,
  showName,
  ...rest
}: VerticalGameListProps) {
  const { containerSpace, itemSpace, contentWidth } =
    useGameGridSize(numColumns)
  const { t } = useLocalization()
  const sx = useSx()
  const locale = useAppSelector((s) => s.setting.locale)

  const renderItem = ({ item }: { item: Game }) => {
    const { gc, gpc, gtc, img, tags, name } = item
    const imageUrl = `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${img}`
    const isNewGame = tags.includes(GAME_TAGS.NEW)
    const isHotGame = tags.includes(GAME_TAGS.HOT)
    const title = showName ? name[locale] : undefined
    return (
      <AnimatePresence>
        <MotiView
          from={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
          }}
        >
          <SimpleGridImage
            sx={{ m: itemSpace }}
            providerCode={gpc}
            gameCode={gc}
            gameTypeCode={gtc}
            image={{ uri: imageUrl }}
            width={contentWidth}
            isNewGame={isNewGame}
            isHotGame={isHotGame}
            title={title}
          />
        </MotiView>
      </AnimatePresence>
    )
  }

  return (
    <FlatList<Game[]>
      nestedScrollEnabled={true}
      numColumns={numColumns}
      style={sx({ bg: '$background', flex: 1 })}
      columnWrapperStyle={{ padding: containerSpace }}
      contentContainerStyle={{ paddingBottom: 20 }}
      data={games}
      keyExtractor={(_, index) => {
        return `${index}`
      }}
      renderItem={renderItem}
      ListEmptyComponent={
        <View sx={{ alignItems: 'center', mt: '$5' }}>
          {isLoading ? (
            <ActivityIndicator color={'$lightCyan'} />
          ) : (
            <Text>{t('common.noInfoAvailable')}</Text>
          )}
        </View>
      }
      {...rest}
    />
  )
}
