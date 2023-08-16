import GameListSectionGrid from 'app/components/game/GameListSectionGrid'
import { ALL, HOT } from 'app/utils/constant'
import { SxProp, Text, View } from 'dripsy'
import React, { startTransition, useEffect, useMemo, useState } from 'react'
import union from 'lodash/union'
import { Game } from 'services/gameApi.type'
import { ViewProps } from 'react-native'
import SelectProvider from 'desktop-ext/components/game/SelectProvider'
import countBy from 'lodash/countBy'
import useLocalization from 'app/provider/localization'
import {
  useGetTagName,
  type GameCategoryTagTranslation,
} from 'app/hooks/appState/game/useGameCategoryTag'
interface Props extends ViewProps {
  label: string
  games: Game[]
  sx?: SxProp
  gameCategoryTagTranslation?: GameCategoryTagTranslation
}

export default function GameList({
  label,
  games,
  gameCategoryTagTranslation,
  ...rest
}: Props) {
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
  const { getTagName } = useGetTagName()

  const filteredGame = useMemo(() => {
    return filter === ALL ? games : games.filter((g) => g.tags.includes(filter))
  }, [filter, games])

  const providerFiltered = useMemo(() => {
    return provider ? filteredGame.filter((g) => g.gpc == provider) : undefined
  }, [provider, filteredGame])

  const providers = useMemo(() => {
    return Object.keys(countBy(filteredGame, (g) => g.gpc))
  }, [filteredGame])

  useEffect(() => {
    if (tags.length) {
      const defaultTag = tags.find((tag) => tag === HOT)

      startTransition(() => {
        setFilter(defaultTag ?? ALL)
      })
    }
  }, [tags])

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
              {getTagName(f, gameCategoryTagTranslation)}
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
