import { FlashList } from '@shopify/flash-list'
import GamePageHeader from 'app/components/GamePageHeader'
import SectionHeader from 'app/components/SectionHeader'
import GameCard from 'app/components/game/GameCard'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { GAME_TYPE_CODE } from 'app/utils/constant'
import { GameToLaunchPayload } from 'app/utils/game'
import { Row, useResponsiveValue } from 'dripsy'
import React from 'react'
import {
  useGetGameListByCategoryQuery
} from 'services/gameApi'
import { Game } from 'services/gameApi.type'
import { usePlayerProfileQuery } from 'services/playerApi'
import BannerSection from '../home/BannerSection'
import RecentlyPlayedSection from '../home/RecentlyPlayedSection'

export default function LiveCasinoScreen() {
  const { t } = useLocalization()
  const locale = useAppSelector((s) => s.setting.locale)

  const { data: playerProfile } = usePlayerProfileQuery()
  const { currency } = playerProfile || {}

  const { data } = useGetGameListByCategoryQuery([GAME_TYPE_CODE.LIVE_DEALER])

  const numColumns = useResponsiveValue([2, 3, 3, 4])

  function renderItem({ item, index }: { item: Game; index: number }) {
    const { name, img } = item

    const formattedName = name
      ? typeof name === 'string'
        ? name
        : name[locale]
      : undefined

    const isMostLeft = index % numColumns === 0
    const isMostRight = index % numColumns === numColumns - 1
    const isMiddle = !isMostLeft && !isMostRight
    const spacePercentage = 5
    const launchPayload = GameToLaunchPayload(item, locale)

    return (
      <Row
        sx={{
          flex: 1,
          ml: isMostLeft ? `${spacePercentage}%` : 0,
          mr: isMostRight ? `${spacePercentage}%` : 0,
        }}
      >
        <GameCard
          name={formattedName}
          image={img}
          sx={{
            my: `${spacePercentage}%`,
            flex: 1,
            mx: isMiddle ? `${spacePercentage * 1.5}%` : `${spacePercentage}%`,
          }}
          {...launchPayload}
        />
      </Row>
    )
  }

  return (
    <FlashList
      key={numColumns}
      estimatedItemSize={160}
      showsVerticalScrollIndicator={false}
      data={data}
      renderItem={renderItem}
      numColumns={numColumns}
      contentContainerStyle={{
        paddingBottom: 40,
      }}
      ListHeaderComponent={
        <>
          <GamePageHeader title={'LIVE CASINO'} icon="casino" />
          <BannerSection />
          <RecentlyPlayedSection />
          <SectionHeader
            title={'PROVIDERS'}
            icon="all"
            sx={{
              mb: '$sectionBottomSpace',
            }}
          />
        </>
      }
    />
  )
}
