import GameListSectionGrid from 'app/components/game/GameListSectionGrid'
import { ALL } from 'app/utils/constant'
import { SxProp, Text, View } from 'dripsy'
import React, { useMemo, useState } from 'react'
import union from 'lodash/union'
import { Game } from 'services/gameApi.type'
import { ViewProps } from 'react-native'
import SelectProvider from 'desktop-ext/components/game/SelectProvider'
import countBy from 'lodash/countBy'
import useLocalization from 'app/provider/localization'
interface Props extends ViewProps {
  label: string
  games: Game[]
  sx?: SxProp
}

export default function GameList({ label, games, ...rest }: Props) {
  const [filter, setFilter] = useState(ALL)
  const [provider, setProvider] = useState<string | undefined>()
  const { t } = useLocalization()

  const tags = useMemo(() => {
    setProvider(undefined)
    return games.reduce(
      (distinctTags, currentGame) => union(distinctTags, currentGame.tags),
      [ALL]
    )
  }, [games])

  const filteredGame = useMemo(() => {
    return filter === ALL ? games : games.filter((g) => g.tags.includes(filter))
  }, [filter, games])

  const providerFiltered = useMemo(() => {
    return provider ? filteredGame.filter((g) => g.gpc == provider) : undefined
  }, [provider, filteredGame])

  const providers = useMemo(() => {
    return Object.keys(countBy(filteredGame, (g) => g.gpc))
  }, [filteredGame])

  return (
    <View {...rest}>
      <GameListSectionGrid.Header>
        <Text sx={{ fontWeight: '900' }}>{t(label)}</Text>
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
        <SelectProvider
          providers={providers}
          value={provider}
          onSelect={setProvider}
        />
      </GameListSectionGrid.Filter>
      <GameListSectionGrid.GameList
        data={providerFiltered ?? filteredGame}
        bordered
      />
    </View>
  )
}
