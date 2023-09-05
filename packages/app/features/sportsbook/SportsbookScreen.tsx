import { FlashList } from '@shopify/flash-list'
import GamePageHeader from 'app/components/GamePageHeader'
import GameCard from 'app/components/game/GameCard'
import {
  GetCommissionList,
  GetGameRebateValue,
} from 'app/components/game/GameUtilityAction'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { GAME_TYPE_CODE } from 'utils/constant'
import { Row, View, useResponsiveValue } from 'dripsy'
import React, { useMemo } from 'react'
import { useGetGameListByCategoryQuery } from 'services/gameApi'
import { Game } from 'services/gameApi.type'
import MatchSection from './MatchSection'
import uniqBy from 'lodash/uniqBy'

export default function SportsbookScreen() {
  const { t } = useLocalization()
  const locale = useAppSelector((s) => s.setting.locale)

  const { data } = useGetGameListByCategoryQuery([
    GAME_TYPE_CODE.SPORTS,
    GAME_TYPE_CODE.E_SPORTS,
    GAME_TYPE_CODE.VIRTUAL_SPORTS,
  ])
  const commissionList = GetCommissionList()

  const numColumns = useResponsiveValue([2, 3, 3, 4])

  const providers = useMemo(() => {
    if (data) return uniqBy(data, (d) => [d.gpc, d.gtc].join())
    else return []
  }, [data])

  function renderItem({ item, index }: { item: Game; index: number }) {
    const { name } = item

    const isMostLeft = index % numColumns === 0
    const isMostRight = index % numColumns === numColumns - 1
    const isMiddle = !isMostLeft && !isMostRight
    const spacePercentage = 5

    return (
      <Row
        sx={{
          flex: 1,
          ml: isMostLeft ? `${spacePercentage}%` : 0,
          mr: isMostRight ? `${spacePercentage}%` : 0,
        }}
      >
        <GameCard
          showRebate={true}
          rebateText={GetGameRebateValue({
            commissionList,
            gtc: item.gtc,
            gpc: item.gpc,
          })}
          rebateTop
          sx={{
            my: `${spacePercentage}%`,
            flex: 1,
            mx: isMiddle ? `${spacePercentage * 1.5}%` : `${spacePercentage}%`,
          }}
          isDualVersion
          {...item}
        />
      </Row>
    )
  }

  return (
    <FlashList
      key={numColumns}
      estimatedItemSize={160}
      showsVerticalScrollIndicator={false}
      data={providers}
      renderItem={renderItem}
      numColumns={numColumns}
      contentContainerStyle={{
        paddingBottom: 40,
      }}
      extraData={commissionList}
      ListHeaderComponent={
        <View sx={{ gap: '$3', my: '$3' }}>
          <GamePageHeader
            title={t('game.category.sportsbook')}
            icon="sportbook"
          />
          <MatchSection />
        </View>
      }
    />
  )
}
