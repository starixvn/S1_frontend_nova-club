import GameListSectionGrid from 'app/components/game/GameListSectionGrid'
import { GetCommissionList } from 'app/components/game/GameUtilityAction'
import {
  useGetTagName,
  type GameCategoryTagTranslation,
} from 'app/hooks/appState/game/useGameCategoryTag'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { ALL, HOT } from 'app/utils/constant'
import SelectProvider from 'desktop-ext/components/game/SelectProvider'
import { SxProp, Text, View } from 'dripsy'
import union from 'lodash/union'
import uniqBy from 'lodash/uniqBy'
import React, { startTransition, useEffect, useMemo, useState } from 'react'
import { ViewProps } from 'react-native'
import { Game } from 'services/gameApi.type'
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
  const [search, setSearch] = useState<string>()
  const { t } = useLocalization()
  const locale = useAppSelector((s) => s.setting.locale)
  const commissionList = GetCommissionList()

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
    if (filteredGame)
      return uniqBy(
        filteredGame.map(({ gtc, gpc }) => ({ gtc, gpc })),
        'gpc'
      )
    else return []
  }, [filteredGame])

  const searchedGame = useMemo(() => {
    return providerFiltered && search
      ? providerFiltered.filter((g) => {
          return g.name[locale]?.toLowerCase().includes(search.toLowerCase())
        })
      : filteredGame && search
      ? filteredGame.filter((g) => {
          return g.name[locale]?.toLowerCase().includes(search.toLowerCase())
        })
      : undefined
  }, [providerFiltered, search, filteredGame, locale])

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
      <GameListSectionGrid.Header
        onSearch={(t) => {
          startTransition(() => setSearch(t))
        }}
      >
        <Text sx={{ fontWeight: '900' }}>{t(label)}</Text>
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
        <SelectProvider
          providers={providers}
          value={provider}
          onSelect={setProvider}
          commissionList={commissionList}
        />
      </GameListSectionGrid.TagBody>
      <GameListSectionGrid.GameList
        data={searchedGame ?? providerFiltered ?? filteredGame}
        bordered
      />
    </View>
  )
}
