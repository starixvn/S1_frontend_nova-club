import GameListSectionGrid from 'app/components/game/GameListSectionGrid'
import { ALL } from 'app/utils/constant'
import { SxProp, Text, View } from 'dripsy'
import React, { useMemo, useState } from 'react'
import union from 'lodash/union'
import { Game } from 'services/gameApi.type'
import { ViewProps } from 'react-native'
import Icon from 'app/components/Icon'

interface Props extends ViewProps {
  label: string
  games: Game[]
  sx?: SxProp
}

export default function GameList({ label, games, ...rest }: Props) {
  const [filter, setFilter] = useState(ALL)
  const [provider, setProvider] = useState()

  const tags = useMemo(() => {
    return games.reduce(
      (distinctTags, currentGame) => union(distinctTags, currentGame.tags),
      [ALL]
    )
  }, [games])

  const filteredGame = useMemo(() => {
    return filter === ALL ? games : games.filter((g) => g.tags.includes(filter))
  }, [filter, games])

  return (
    <View {...rest}>
      <GameListSectionGrid.Header>
        <Text sx={{ fontWeight: '900' }}>{label}</Text>
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
        <Text>Button</Text>
        <Icon name="search" sx={{ marginLeft: 'auto' }} />
      </GameListSectionGrid.Filter>
      <GameListSectionGrid.GameList data={filteredGame} bordered />
    </View>
  )
}
