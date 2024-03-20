import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { FlashList } from '@shopify/flash-list'
import GameCard from 'app/components/game/GameCard'
import GameListSectionGrid from 'app/components/game/GameListSectionGrid'
import { GetGameRebateValue } from 'app/components/game/GameUtilityAction'
import {
  GameCategoryTagTranslation,
  useGetTagName,
} from 'app/hooks/appState/game/useGameCategoryTag'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { SxProp, Text, View, useResponsiveValue } from 'dripsy'
import sortBy from 'lodash/sortBy'
import union from 'lodash/union'
import React, {
  startTransition,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { CommissionTableResult } from 'services/contentApi.type'
import { useGameCategoryTagTypesQuery } from 'services/gameApi'
import { Game } from 'services/gameApi.type'
import { SolitoImage } from 'solito/image'
import { ALL } from 'utils/constant'

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

const ITEM_PER_PAGE = 20

const SlotSingleProviderListing = ({
  games,
  provider,
  sx,
  gameCategoryTagTranslation,
  gtc,
  commissionList = [],
  hideTag,
}: SlotSingleProviderListingProps) => {
  const { t } = useLocalization()
  const { top, bottom } = useSafeArea()
  const locale = useAppSelector((s) => s.setting.locale)
  const flashListRef = useRef<FlashList<Game>>(null)
  const [items, setItems] = useState<Game[]>([])
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

  useEffect(() => {
    searchedGame
      ? setItems(searchedGame?.slice(0, ITEM_PER_PAGE) ?? [])
      : filteredGames && setItems(filteredGames?.slice(0, ITEM_PER_PAGE) ?? [])
  }, [searchedGame, filteredGames])

  useEffect(() => {
    setSearch('')
    setFilter(ALL)
    flashListRef.current?.scrollToIndex({
      animated: true,
      index: 0,
    })
  }, [provider])

  const onLoadMoreItems = () => {
    const data = searchedGame ?? filteredGames
    const currentLength = items.length

    const newItems = data.slice(currentLength, currentLength + ITEM_PER_PAGE)
    setItems([...items, ...newItems])
  }

  return (
    <View
      sx={{
        flex: 1,
        bg: '$primary.700',
        pt: top ? top + 10 : '$3',
        ...sx,
      }}
    >
      <View>
        {/* <Row sx={{ justifyContent: 'space-between' }}>
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
                      src={`${MEDIA_DOMAIN}${CONTENT_URI}/v2/gameV2/provider/white/${provider.toLowerCase()}.png`}
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
        </Row> */}

        <GameListSectionGrid.Header
          key={provider} //add key to fix the rebate value animation stop working after sometime/ not in view
          showRebate={!!provider}
          rebateValue={GetGameRebateValue({
            commissionList,
            gpc: provider?.toUpperCase() ?? '',
            gtc,
          })}
          onSearch={(t) => {
            startTransition(() => setSearch(t))
          }}
        >
          <View sx={{ flexDirection: 'row' }}>
            {provider ? (
              <SolitoImage
                height={25}
                width={90}
                src={`${MEDIA_DOMAIN}${CONTENT_URI}/v2/gameV2/provider/white/${provider?.toLowerCase()}.png`}
                contentFit="contain"
                alt={provider}
              />
            ) : (
              <Text sx={{ fontWeight: '900' }}>{t('common.all')}</Text>
            )}
          </View>
        </GameListSectionGrid.Header>

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
      <View style={{ height: 500 }}>
        <FlashList
          ref={flashListRef}
          contentContainerStyle={{ paddingBottom: bottom, paddingTop: 12 }}
          key={column}
          estimatedItemSize={100}
          // data={searchedGame ?? filteredGames}
          data={items}
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
          onEndReached={onLoadMoreItems}
          onEndReachedThreshold={0.5}
        />
      </View>
    </View>
  )
}

export default SlotSingleProviderListing
