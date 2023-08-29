import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { FlashList } from '@shopify/flash-list'
import Icon from 'app/components/Icon'
import SectionLabel from 'app/components/SectionLabel'
import Shadow from 'app/components/Shadow'
import GameCard from 'app/components/game/GameCard'
import GameListSectionGrid from 'app/components/game/GameListSectionGrid'
import GameRebateLabel from 'app/components/game/GameRebateLabel'
import { GetGameRebateValue } from 'app/components/game/GameUtilityAction'
import {
  GameCategoryTagTranslation,
  useGetTagName,
} from 'app/hooks/appState/game/useGameCategoryTag'
import { useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { ALL } from 'app/utils/constant'
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
import { useGameCategoryTagTypesQuery } from 'services/gameApi'
import { Game } from 'services/gameApi.type'
import { SolitoImage } from 'solito/image'
import sortBy from 'lodash/sortBy'

interface SlotSingleProviderListingProps {
  games: Game[]
  provider?: string
  icon?: string
  title?: string
  onBack: () => void
  sx?: SxProp
  gameCategoryTagTranslation?: GameCategoryTagTranslation
  commissionList: CommissionTableResult[]
  gtc: string
  hideTag?: boolean
}
const SlotSingleProviderListing = ({
  games,
  provider,
  icon,
  title = '',
  onBack,
  sx,
  gameCategoryTagTranslation,
  gtc,
  commissionList = [],
  hideTag,
}: SlotSingleProviderListingProps) => {
  const { top, bottom } = useSafeArea()

  const { theme } = useDripsyTheme()
  const locale = useAppSelector((s) => s.setting.locale)
  const [filter, setFilter] = useState<string>(ALL)
  const [search, setSearch] = useState<string>()
  const [filteredGames, setFilteredGames] = useState<Game[]>([])
  const { data: gameCategoryTagTypes } = useGameCategoryTagTypesQuery()
  const { getTagName } = useGetTagName()

  const tags = useMemo(() => {
    if (games) {
      return games.reduce(
        (distinctTags, currentGame) => union(distinctTags, currentGame.tags),
        []
      )
    } else return ['ALL']
  }, [games])

  // Sort according to gameCategoryTagTypes seq
  const sortedTagsArray = sortBy(tags, (tag) => {
    const filterTag = gameCategoryTagTypes?.filter((el) => el.gtc === 'slots')

    const index = filterTag?.findIndex((item) => item.ck === tag)
    return index !== -1 ? index : filterTag?.length
  })
  const seqTags = [ALL, ...sortedTagsArray]

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
                  px: ['$1'],
                }}
              >
                <Icon name="back" />
                {provider && (
                  <>
                    <SolitoImage
                      alt={provider}
                      height={20}
                      width={100}
                      src={`${MEDIA_DOMAIN}${CONTENT_URI}/v2/game/provider/white/${provider.toLowerCase()}.png`}
                    />
                    <View sx={{ justifyContent: 'center', px: '$2' }}>
                      <GameRebateLabel
                        background={'rgba(0,0,0,0.6)'}
                        rebateText={GetGameRebateValue({
                          commissionList,
                          gpc: provider.toUpperCase(),
                          gtc,
                        })}
                      />
                    </View>
                  </>
                )}
                {icon && <SectionLabel icon={icon} title={title} />}
              </Row>
            </Shadow>
          </Pressable>
          <GameListSectionGrid.Search
            onSearch={(t) => {
              startTransition(() => setSearch(t))
            }}
          />
        </Row>

        {!hideTag && (
          <GameListSectionGrid.TagBody>
            {seqTags.map((f) => {
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
        )}
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

export default SlotSingleProviderListing
