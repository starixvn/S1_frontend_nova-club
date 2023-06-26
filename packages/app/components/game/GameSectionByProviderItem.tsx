import {
  View,
  useResponsiveValue
} from 'dripsy'
import union from 'lodash/union'
import React, { startTransition, useEffect, useMemo, useState } from 'react'
import { Game } from 'services/gameApi.type'
import { SolitoImage } from 'solito/image'

import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { ALL } from 'app/utils/constant'
import GameListSectionGrid from './GameListSectionGrid'

function GameSectionByProviderItem({
  gpc,
  games = [],
  // GameListComponent = GameSectionByProviderItemGameListSummary,
  bordered = false,
}: {
  bordered: boolean
  gpc: string
  games: Game[]
  // GameListComponent: FC<{ data: Game[] }>
}) {
  const [filter, setFilter] = useState(ALL)
  const count = useResponsiveValue([8, 10, 12, 999, 999])

  useEffect(() => {
    startTransition(() => setFilter(ALL))
  }, [gpc])

  const tags = useMemo(() => {
    return games.reduce(
      (distinctTags, currentGame) => union(distinctTags, currentGame.tags),
      [ALL]
    )
  }, [games])

  const filteredGame = useMemo(() => {
    return (
      filter === ALL ? games : games.filter((g) => g.tags.includes(filter))
    ).slice(0, count)
  }, [count, filter, games])

  return (
    <View nativeID={`gameSection${gpc}`}>
      <GameListSectionGrid.Header>
        <SolitoImage
          height={20}
          width={90}
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/v2/game/provider/white/${gpc?.toLowerCase()}.png`}
          resizeMode="contain"
          alt={gpc}
        />
      </GameListSectionGrid.Header>
      <GameListSectionGrid.Filter>
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
              {f.toUpperCase()}
            </GameListSectionGrid.TagButton>
          )
        })}
      </GameListSectionGrid.Filter>
      <GameListSectionGrid.GameList data={filteredGame} bordered={bordered} />
    </View>
  )
}

export default GameSectionByProviderItem
