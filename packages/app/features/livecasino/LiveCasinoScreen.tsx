import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { FlashList } from '@shopify/flash-list'
import GamePageHeader from 'app/components/GamePageHeader'
import SectionHeader from 'app/components/SectionHeader'
import GameCard from 'app/components/game/GameCard'
import useLocalization from 'app/provider/localization'
import { GAME_TYPE_CODE } from 'app/utils/constant'
import { Row, View, useResponsiveValue } from 'dripsy'
import groupBy from 'lodash/groupBy'
import React, { useMemo } from 'react'
import { useGetGameListByCategoryQuery } from 'services/gameApi'
import { Game } from 'services/gameApi.type'
import { SolitoImage } from 'solito/image'
import RecentlyPlayedSection from '../home/RecentlyPlayedSection'

export default function LiveCasinoScreen() {
  const { data } = useGetGameListByCategoryQuery([GAME_TYPE_CODE.LIVE_DEALER])
  const { t } = useLocalization()

  const firstGameOfEachProvider = useMemo(() => {
    if (data) {
      const groupedGames = groupBy(data, 'gpc')
      return Object.keys(groupedGames).map((k) => {
        const p = groupedGames[k]
        if (p) return p[0]
      })
    } else return []
  }, [data])

  const numColumns = useResponsiveValue([2, 3, 3, 4])

  function renderItem({
    item,
    index,
  }: {
    item: Game | undefined
    index: number
  }) {
    if (!item) return null

    const isMostLeft = index % numColumns === 0
    const isMostRight = index % numColumns === numColumns - 1
    const isMiddle = !isMostLeft && !isMostRight
    const spacePercentage = 4

    return (
      <Row
        sx={{
          flex: 1,
          ml: isMostLeft ? `${spacePercentage}%` : 0,
          mr: isMostRight ? `${spacePercentage}%` : 0,
        }}
      >
        <GameCard
          // absoluteName
          // displayName={formattedName}
          sx={{
            my: `${spacePercentage}%`,
            flex: 1,
            mx: isMiddle ? `${spacePercentage * 1.5}%` : `${spacePercentage}%`,
          }}
          {...item}
          img={`${MEDIA_DOMAIN}${CONTENT_URI}/v2/game/provider/main/${item.gpc.toLowerCase()}.png`}
        />
      </Row>
    )
  }

  return (
    <FlashList
      key={numColumns}
      estimatedItemSize={160}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 30,
      }}
      data={firstGameOfEachProvider}
      renderItem={renderItem}
      numColumns={numColumns}
      ListHeaderComponent={
        <View sx={{ gap: '$3', my: '$3' }}>
          <GamePageHeader title={t('game.category.liveCasino')} icon="casino" />

          <View sx={{ width: '100%', aspectRatio: 1280 / 333 }}>
            <SolitoImage
              fill
              src={`${MEDIA_DOMAIN}${CONTENT_URI}/v2/banners/livecasino/dailywins_pp.jpg`}
              alt="dailywins"
            />
          </View>
          <RecentlyPlayedSection gameTypes={[GAME_TYPE_CODE.LIVE_DEALER]} />
          <SectionHeader title={t('common.provider')} icon="all" />
        </View>
      }
    />
  )
}
