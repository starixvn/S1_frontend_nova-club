import { CellContainer, FlashList } from '@shopify/flash-list'
import GamePageHeader from 'app/components/GamePageHeader'
import GameCard from 'app/components/game/GameCard'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { Currency, GAME_TYPE_CODE } from 'app/utils/constant'
import React from 'react'
import { useGetGameListQuery } from 'services/gameApi'
import { Game } from 'services/gameApi.type'
import { usePlayerProfileQuery } from 'services/playerApi'
import MatchSection from './MatchSection'
import { FlatList, Row, View, useResponsiveValue } from 'dripsy'

export default function SportsbookScreen() {
  const { t } = useLocalization()
  const locale = useAppSelector((s) => s.setting.locale)

  const { data: playerProfile } = usePlayerProfileQuery()
  const { currency } = playerProfile || {}

  const { gameList } = useGetGameListQuery(
    {
      currency: currency ?? Currency.VND,
      game_category: [
        GAME_TYPE_CODE.SPORTS,
        GAME_TYPE_CODE.E_SPORTS,
        GAME_TYPE_CODE.VIRTUAL_SPORTS,
      ],
      limit: 100,
      offset: 0,
    },
    {
      selectFromResult: (resp) => {
        return { ...resp, gameList: resp.data?.data?.rows }
      },
    }
  )

  const numColumns = useResponsiveValue([2, 3, 3, 4])

  function renderItem({ item, index }: { item: Game; index: number }) {
    const { name, img } = item
    async function launchGame() {
      // todo launch game
    }
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
          name={formattedName}
          image={img}
          sx={{
            my: `${spacePercentage}%`,
            flex: 1,
            mx: isMiddle ? `${spacePercentage * 1.5}%` : `${spacePercentage}%`,
          }}
        />
      </Row>
    )
  }

  return (
    <FlashList
      key={numColumns}
      estimatedItemSize={160}
      showsVerticalScrollIndicator={false}
      data={gameList}
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
