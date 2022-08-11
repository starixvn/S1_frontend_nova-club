import React from 'react'
import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import SimpleGridImage, {
  GAME_IMAGE_RATIO,
} from 'app/components/SimpleGridImage'
import useGameGridSize from 'app/hooks/useGameGridSize'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { GAME_TAGS } from 'app/utils/constant'
import { View, FlatList, ActivityIndicator, Text, useSx } from 'dripsy'
import { AnimatePresence, MotiView } from 'moti'
import {
  ComponentProps,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import StickyContainer from 'recyclerlistview/sticky'

import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from 'recyclerlistview'
import { Game } from 'services/contentApi.type'

type RecyclerListViewProps = Partial<ComponentProps<typeof RecyclerListView>>
type VerticalGameListProps = RecyclerListViewProps & {
  games: Game[]
  isLoading?: boolean
  showName?: boolean
  numColumns?: number
  ListHeaderComponent?: React.ReactNode
}

const ViewTypes = {
  HEADER: 0,
  LISTITEM: 1,
}

export default function VerticalGameList({
  games,
  isLoading,
  numColumns = 3,
  showName,
  ListHeaderComponent,
  ...rest
}: VerticalGameListProps) {
  const { containerSpace, itemSpace, contentWidth, width } =
    useGameGridSize(numColumns)
  const { t } = useLocalization()
  const sx = useSx()
  const locale = useAppSelector((s) => s.setting.locale)
  const memoSpace = useMemo(() => {
    return {
      m: itemSpace,
    }
  }, [itemSpace])

  const [dataProvider, setDataProvider] = useState<DataProvider>(
    new DataProvider((r1, r2) => {
      return r1 !== r2
    })
  )

  useEffect(() => {
    setDataProvider(
      dataProvider.cloneWithRows(ListHeaderComponent ? [{}, ...games] : games)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [games])

  const layoutProvider = useMemo(
    () =>
      new LayoutProvider(
        (index) => {
          return index === 0 ? ViewTypes.HEADER : ViewTypes.LISTITEM
        },
        (type, dim) => {
          if (type === ViewTypes.HEADER) {
            dim.width = width
            dim.height = 60
          } else {
            const colWidth = (width - containerSpace * 2) / numColumns - 0.0001
            dim.width = colWidth
            dim.height = colWidth / GAME_IMAGE_RATIO + (showName ? 20 : 0)
          }
        }
      ),
    []
  )

  const renderer = useCallback((type, item, index, extendedState) => {
    if (type === ViewTypes.HEADER && ListHeaderComponent) {
      return null
    } else {
      const { gc, gpc, img, tags, name, gtc } = item
      const imageUrl = `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${img}`
      const isNewGame = tags.includes(GAME_TAGS.NEW)
      const isHotGame = tags.includes(GAME_TAGS.HOT)
      const isDesktop = tags.includes(GAME_TAGS.DESKTOP)
      const gameName = showName ? name[locale] : undefined
      return (
        <SimpleGridImage
          sx={memoSpace}
          providerCode={gpc}
          gameCode={gc}
          image={imageUrl}
          width={contentWidth}
          isNewGame={isNewGame}
          isHotGame={isHotGame}
          gameName={gameName}
          gameType={gtc}
          desktopMode={isDesktop}
        />
      )
    }
  }, [])

  const header = useCallback(
    (type, data, index) => {
      const view = renderer(type, data, index, {})
      switch (index) {
        case 0: // Only overriding sticky index 7, sticky indices 3 and 10 will remain as they are.
          return ListHeaderComponent
      }
      return view
    },
    [ListHeaderComponent]
  )

  return (
    <StickyContainer
      stickyHeaderIndices={[0]}
      stickyFooterIndices={[0]}
      overrideRowRenderer={header}
    >
      <RecyclerListView
        style={sx({ bg: '$background', flex: 1 })}
        rowRenderer={renderer}
        dataProvider={dataProvider}
        layoutProvider={layoutProvider}
        scrollViewProps={{
          contentContainerStyle: {
            padding: containerSpace,
          },
        }}
        {...rest}
      />
    </StickyContainer>
  )
}
