import { View, useResponsiveValue } from 'dripsy'
import union from 'lodash/union'
import React, {
  memo,
  startTransition,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Game } from 'services/gameApi.type'
import { SolitoImage } from 'solito/image'

import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import {
  useGetTagName,
  type GameCategoryTagTranslation,
} from 'app/hooks/appState/game/useGameCategoryTag'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { ALL, HOT } from 'app/utils/constant'
import { Text } from 'dripsy'
import Button from '../common/Button'
import GameListSectionGrid from './GameListSectionGrid'

function GameSectionByProviderItem({
  gpc,
  games = [],
  // GameListComponent = GameSectionByProviderItemGameListSummary,
  bordered = false,
  onViewMore,
  gameListProps,
  gameCategoryTagTranslation,
}: {
  bordered?: boolean
  gpc?: string
  games: Game[]
  onViewMore?: (gpc: string, tag: string) => void
  gameListProps?: any
  gameCategoryTagTranslation?: GameCategoryTagTranslation
  // GameListComponent: FC<{ data: Game[] }>
}) {
  const { t } = useLocalization()
  const locale = useAppSelector((s) => s.setting.locale)
  const [filter, setFilter] = useState('hot')
  const [search, setSearch] = useState<string>()
  const count = useResponsiveValue([8, 10, 12, 999, 999])

  const { getTagName } = useGetTagName()

  const tags = useMemo(() => {
    return games.reduce(
      (distinctTags, currentGame) => union(distinctTags, currentGame.tags),
      [ALL]
    )
  }, [games])

  const filteredGame = useMemo(() => {
    return filter === ALL ? games : games.filter((g) => g.tags.includes(filter))
  }, [filter, games])

  const searchedGame = useMemo(() => {
    return search
      ? filteredGame.filter((g) => {
          return g.name[locale]?.toLowerCase().includes(search.toLowerCase())
        })
      : undefined
  }, [search, filteredGame, locale])

  const showMinimumGame = (game: Game[]) => {
    return game.slice(0, count)
  }

  useEffect(() => {
    if (tags.length) {
      const defaultTag = tags.find((tag) => tag === HOT)

      startTransition(() => {
        setFilter(defaultTag ?? ALL)
      })
    }
  }, [gpc, tags])

  const canShowMore = () => {
    return (searchedGame?.length ?? filteredGame.length ?? games.length) > count
  }

  return (
    <View nativeID={`gameSection${gpc}`}>
      <GameListSectionGrid.Header
        onSearch={(t) => {
          startTransition(() => setSearch(t))
        }}
      >
        {gpc ? (
          <SolitoImage
            height={20}
            width={90}
            src={`${MEDIA_DOMAIN}${CONTENT_URI}/v2/game/provider/white/${gpc?.toLowerCase()}.png`}
            contentFit="contain"
            alt={gpc}
          />
        ) : (
          <Text sx={{ fontWeight: '900' }}>{t('common.all')}</Text>
        )}
      </GameListSectionGrid.Header>
      <GameListSectionGrid.TagBody>
        {tags.map((f) => {
          const isActive = filter === f
          return (
            <GameListSectionGrid.TagButton
              key={f}
              onPress={() => {
                setFilter(f)
              }}
              isActive={isActive}
            >
              {getTagName(f, gameCategoryTagTranslation)}
            </GameListSectionGrid.TagButton>
          )
        })}
      </GameListSectionGrid.TagBody>

      <GameListSectionGrid.GameList
        data={showMinimumGame(searchedGame ?? filteredGame)}
        bordered={bordered}
        {...gameListProps}
      />
      {onViewMore && canShowMore() && (
        <Button
          sx={{ alignSelf: 'center', my: '$3' }}
          onPress={() => gpc && onViewMore(gpc, filter)}
        >
          {t('common.showMore')}
        </Button>
      )}
    </View>
  )
}

export default memo(GameSectionByProviderItem)
