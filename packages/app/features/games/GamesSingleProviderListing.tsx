import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { FlashList } from '@shopify/flash-list'
import Icon from 'app/components/Icon'
import IconButtonGradientGroup from 'app/components/IconButtonGradientGroup'
import IconButtonGradientToggle from 'app/components/IconButtonGradientToggle'
import Shadow from 'app/components/Shadow'
import GameCard from 'app/components/game/GameCard'
import GameListSectionGrid from 'app/components/game/GameListSectionGrid'
import { useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { ALL, HOT } from 'app/utils/constant'
import {
  Pressable,
  Row,
  SxProp,
  View,
  useDripsyTheme,
  useResponsiveValue,
  useSx,
} from 'dripsy'
import union from 'lodash/union'
import React, { startTransition, useEffect, useMemo, useState } from 'react'
import { Game } from 'services/gameApi.type'
import { SolitoImage } from 'solito/image'
import { MobileGamesFilter } from './subroutes'
import {
  useGetTagName,
  type GameCategoryTagTranslation,
} from 'app/hooks/appState/game/useGameCategoryTag'

interface GamesSingleProviderListingProps {
  games: Game[]
  provider: string
  type: string
  onFilterClicked: (r, i: number) => void
  onBack: () => void
  sx?: SxProp
  gameCategoryTagTranslation?: GameCategoryTagTranslation
}
const GamesSingleProviderListing = ({
  games,
  provider,
  type,
  onFilterClicked,
  onBack,
  sx,
  gameCategoryTagTranslation,
}: GamesSingleProviderListingProps) => {
  const sxP = useSx()
  const { top, bottom } = useSafeArea()

  const { theme } = useDripsyTheme()
  const locale = useAppSelector((s) => s.setting.locale)
  const [localType, setLocalType] = useState(type)
  const [filter, setFilter] = useState<string>(ALL)
  const [filteredGames, setFilteredGames] = useState<Game[]>([])
  const [search, setSearch] = useState<string>()
  const tags = useMemo(() => {
    if (games) {
      return games.reduce(
        (distinctTags, currentGame) => union(distinctTags, currentGame.tags),
        [ALL]
      )
    } else return [ALL]
  }, [games])
  const { getTagName } = useGetTagName()

  const column = useResponsiveValue([4, 5, 6])

  const searchedGame = useMemo(() => {
    return search
      ? filteredGames.filter((g) => {
          return g.name[locale]?.toLowerCase().includes(search.toLowerCase())
        })
      : undefined
  }, [search, filteredGames, locale])

  useEffect(() => {
    if (games) {
      startTransition(() => {
        let filtered = games
        if (filter !== ALL)
          filtered = games.filter((g) => {
            return g.tags && g.tags.includes(filter)
          })
        setFilteredGames(filtered)
      })
    }
  }, [games, filter])

  return (
    <View
      sx={{ flex: 1, bg: '$primary.700', pt: top ? top + 10 : '$3', ...sx }}
    >
      <View sx={{ gap: '$3' }}>
        <Row sx={{ justifyContent: 'space-between' }}>
          <Pressable onPress={onBack}>
            <Shadow
              safeRender
              offset={[0, -1]}
              startColor={theme?.colors?.$primary?.[100]}
              distance={1}
              sx={{ borderTopRightRadius: 20, borderBottomRightRadius: 20 }}
            >
              <Row
                sx={{
                  bg: '$primary.300',
                  borderTopRightRadius: 20,
                  borderBottomRightRadius: 20,
                  alignItems: 'center',
                  py: ['$2'],
                  px: ['$3'],
                  gap: '$3',
                }}
              >
                <Icon name="back" />
                <SolitoImage
                  alt={provider}
                  height={20}
                  width={100}
                  src={`${MEDIA_DOMAIN}${CONTENT_URI}/v2/game/provider/white/${provider.toLowerCase()}.png`}
                />
              </Row>
            </Shadow>
          </Pressable>
          <GameListSectionGrid.Search
            onSearch={(t) => {
              startTransition(() => setSearch(t))
            }}
          />
        </Row>
        <IconButtonGradientGroup
          sx={{
            maxWidth: 550,
            alignSelf: 'center',
          }}
        >
          {MobileGamesFilter.map((r, i) => {
            return (
              <IconButtonGradientToggle
                sx={{ flex: 1 }}
                key={r.label}
                active={type ? r.route.includes(type) : r.route === '/games'}
                label={r.label}
                size={50}
                icon={r.icon ?? 'notice'}
                labelProps={{ style: { fontSize: 11 }, numberOfLines: 2 }}
                onPress={() => onFilterClicked(r, i)}
              />
            )
          })}
        </IconButtonGradientGroup>
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
      </View>
      <View style={{ flex: 1 }}>
        <FlashList
          contentContainerStyle={{ paddingBottom: bottom, paddingTop: 12 }}
          key={column}
          estimatedItemSize={100}
          data={searchedGame ?? filteredGames}
          numColumns={column}
          renderItem={({ item }: { item: Game }) => {
            return (
              <View
                sx={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                  mb: '$2',
                }}
              >
                <GameCard
                  sx={{ width: '85%' }}
                  {...item}
                  displayName={item.name[locale]}
                />
              </View>
            )
          }}
        />
      </View>
    </View>
  )
}

export default GamesSingleProviderListing
