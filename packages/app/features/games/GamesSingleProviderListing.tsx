import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { FlashList } from '@shopify/flash-list'
import Icon from 'app/components/Icon'
import IconButtonGradientGroup from 'app/components/IconButtonGradientGroup'
import IconButtonGradientToggle from 'app/components/IconButtonGradientToggle'
import Shadow from 'app/components/Shadow'
import EmptyResult from 'app/components/dataTable/EmptyResult'
import GameCard from 'app/components/game/GameCard'
import GameListSectionGrid from 'app/components/game/GameListSectionGrid'
import GameRebateLabel from 'app/components/game/GameRebateLabel'
import { GetGameRebateValue } from 'app/components/game/GameUtilityAction'
import {
  useGetTagName,
  type GameCategoryTagTranslation,
} from 'app/hooks/appState/game/useGameCategoryTag'
import { useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { ALL, GAME_TYPE_CODE } from 'app/utils/constant'
import {
  Pressable,
  Row,
  SxProp,
  View,
  useDripsyTheme,
  useResponsiveValue,
} from 'dripsy'
import union from 'lodash/union'
import React, { startTransition, useEffect, useMemo, useState } from 'react'
import { CommissionTableResult } from 'services/contentApi.type'
import { Game } from 'services/gameApi.type'
import { SolitoImage } from 'solito/image'
import { MobileGamesFilter } from './subroutes'

interface GamesSingleProviderListingProps {
  games: Game[]
  provider: string
  type: string
  onFilterClicked: (r, i: number) => void
  onBack: () => void
  sx?: SxProp
  gameCategoryTagTranslation?: GameCategoryTagTranslation
  tag: string
  commissionList: CommissionTableResult[]
  showRebate?: boolean
}
const GamesSingleProviderListing = ({
  games,
  provider,
  type,
  onFilterClicked,
  onBack,
  sx,
  gameCategoryTagTranslation,
  tag = 'ALL',
  commissionList,
  showRebate = true,
}: GamesSingleProviderListingProps) => {
  const { top, bottom } = useSafeArea()

  const { theme } = useDripsyTheme()
  const locale = useAppSelector((s) => s.setting.locale)
  const [filter, setFilter] = useState<string>(tag)
  const [filteredGames, setFilteredGames] = useState<Game[]>([])
  const [search, setSearch] = useState<string>()
  const [gameTypeCode, setGameTypeCode] = useState(ALL)
  const tags = useMemo(() => {
    if (games) {
      return games.reduce(
        (distinctTags, currentGame) => union(distinctTags, currentGame.tags),
        [ALL]
      )
    } else return [filter]
  }, [games, filter])
  const { getTagName } = useGetTagName()
  const mobileGamesFilterResponsiveSize = useResponsiveValue([
    60, 60, 70, 70, 70,
  ])

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

  //Map the type to GAMETYPECODE
  useEffect(() => {
    switch (type) {
      case 'local': {
        setGameTypeCode(GAME_TYPE_CODE.GAMES)
        break
      }
      case 'card': {
        setGameTypeCode(GAME_TYPE_CODE.GAMES)
        break
      }
      case 'fishing': {
        setGameTypeCode(GAME_TYPE_CODE.FISHING)
        break
      }
      case 'keno-lottery': {
        setGameTypeCode(GAME_TYPE_CODE.LOTTERY)
        break
      }
      default:
        setGameTypeCode(ALL)
        break
    }
  }, [type])
  // console.log('providerlisting type:', type, '||', gameTypeCode)
  // console.log('Provider: ', provider)
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
                  px: ['$1'],
                }}
              >
                <Icon name="back" />
                <SolitoImage
                  alt={provider}
                  height={20}
                  width={100}
                  src={`${MEDIA_DOMAIN}${CONTENT_URI}/v2/game/provider/white/${provider.toLowerCase()}.png`}
                />
                {showRebate && (
                  <View sx={{ justifyContent: 'center', px: '$2' }}>
                    <GameRebateLabel
                      background={'rgba(0,0,0,0.6)'}
                      rebateText={GetGameRebateValue({
                        gtc: gameTypeCode,
                        gpc: provider.toUpperCase(),
                        commissionList,
                      })}
                    />
                  </View>
                )}
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
            // flex: 1,
            py: '$2',
            minWidth: ['100%', 450],
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
                size={mobileGamesFilterResponsiveSize}
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
      {filteredGames.length > 0 ? (
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
      ) : (
        <View sx={{ height: 350, justifyContent: 'center' }}>
          <EmptyResult />
        </View>
      )}
    </View>
  )
}

export default GamesSingleProviderListing
