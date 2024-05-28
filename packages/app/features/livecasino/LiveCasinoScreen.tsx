import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { FlashList } from '@shopify/flash-list'
import GamePageHeader from 'app/components/GamePageHeader'
import ScrollToTopWrapper from 'app/components/ScrollToTopWrapper'
import SectionHeader from 'app/components/SectionHeader'
import BannerCarousel from 'app/components/banner/BannerCarousel'
import GameCard from 'app/components/game/GameCard'
import { GetGameRebateValue } from 'app/components/game/GameUtilityAction'
import useFocusedSelector from 'app/hooks/useFocusedSelector'
import useLocalization from 'app/provider/localization'
import FocusedLocalizationProvider from 'app/provider/localization/FocusedLocalizationProvider'
import { Row, View, useResponsiveValue } from 'dripsy'
import groupBy from 'lodash/groupBy'
import React, { useMemo } from 'react'
import {
  selectBannerByPage,
  useBannerQuery,
  useCommissionTableQuery,
} from 'services/contentApi'
import { BannerPage } from 'services/contentApi.type'
import { useGetGameListByCategoryQuery } from 'services/gameApi'
import { Game } from 'services/gameApi.type'
import { GAME_TYPE_CODE, LANGUAGE_NAMESPACE } from 'utils/constant'
import RecentlyPlayedSection from '../home/RecentlyPlayedSection'

export default function LiveCasinoScreen() {
  const currency = useFocusedSelector((s) => s.setting.currency)
  const { data } = useGetGameListByCategoryQuery({
    categories: [GAME_TYPE_CODE.LIVE_DEALER],
    currency,
  })

  const { data: commissionList } = useCommissionTableQuery({ currency })
  const { banners } = useBannerQuery(currency, {
    selectFromResult: (s) => {
      return {
        ...s,
        banners: selectBannerByPage(s.data, BannerPage.LiveCasino),
      }
    },
  })
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
          showRebate={true}
          rebateText={GetGameRebateValue({
            commissionList,
            gtc: GAME_TYPE_CODE.LIVE_DEALER,
            gpc: item.gpc,
          })}
          sx={{
            my: `${spacePercentage}%`,
            flex: 1,
            mx: isMiddle ? `${spacePercentage * 1.5}%` : `${spacePercentage}%`,
          }}
          {...item}
          img={`${MEDIA_DOMAIN}${CONTENT_URI}/v2/game/provider/main/${item.gpc.toLowerCase()}.png`}
          xImg={undefined}
        />
      </Row>
    )
  }

  return (
    <FocusedLocalizationProvider namespace={LANGUAGE_NAMESPACE.MEMBER}>
      <ScrollToTopWrapper>
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
          extraData={commissionList}
          ListHeaderComponent={<LiveCasinoHeader banners={banners} />}
        />
      </ScrollToTopWrapper>
    </FocusedLocalizationProvider>
  )
}

function LiveCasinoHeader({ banners }) {
  const { t } = useLocalization()

  return (
    <View sx={{ gap: '$3', my: '$3' }}>
      <GamePageHeader title={'game.category.liveCasino'} icon="casino" />

      <View sx={{ width: '100%', aspectRatio: 1280 / 333 }}>
        <BannerCarousel data={banners} />
      </View>
      <RecentlyPlayedSection gameTypes={[GAME_TYPE_CODE.LIVE_DEALER]} />
      <SectionHeader title={t('common.provider')} icon="all" />
    </View>
  )
}
