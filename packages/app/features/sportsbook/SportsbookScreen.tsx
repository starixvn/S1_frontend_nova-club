import { FlashList } from '@shopify/flash-list'
import GamePageHeader from 'app/components/GamePageHeader'
import GameCard from 'app/components/game/GameCard'
import { useAppSelector } from 'app/provider/redux/store'
import { GAME_TYPE_CODE } from 'app/utils/constant'
import { Row, useResponsiveValue } from 'dripsy'
import React from 'react'
import { useGetGameListByCategoryQuery } from 'services/gameApi'
import { Game } from 'services/gameApi.type'
import MatchSection from './MatchSection'

export default function SportsbookScreen() {
  const locale = useAppSelector((s) => s.setting.locale)

  const { data } = useGetGameListByCategoryQuery([
    GAME_TYPE_CODE.SPORTS,
    GAME_TYPE_CODE.E_SPORTS,
    GAME_TYPE_CODE.VIRTUAL_SPORTS,
  ])

  const numColumns = useResponsiveValue([2, 3, 3, 4])

  function renderItem({ item, index }: { item: Game; index: number }) {
    const { name } = item
    const formattedName = name
      ? typeof name === 'string'
        ? name
        : name[locale]
      : undefined

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
          displayName={formattedName}
          // image={img}
          sx={{
            my: `${spacePercentage}%`,
            flex: 1,
            mx: isMiddle ? `${spacePercentage * 1.5}%` : `${spacePercentage}%`,
          }}
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
      data={data}
      renderItem={renderItem}
      numColumns={numColumns}
      contentContainerStyle={{
        paddingBottom: 40,
      }}
      ListHeaderComponent={
        <>
          <GamePageHeader title={'SPORTSBOOK'} icon="sportbook" />
          <MatchSection />
        </>
      }
    />
  )
}
