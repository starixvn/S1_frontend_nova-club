import { DripsyGradient } from 'app/components/Gradient'
import SectionLabel from 'app/components/SectionLabel'
import GameCard from 'app/components/game/GameCard'
import HorizontalGameList from 'app/components/game/HorizontalGameList'
import { useAppSelector } from 'app/provider/redux/store'
import { Currency, SlotType } from 'app/utils/constant'
import { Row, View } from 'dripsy'
import React from 'react'
import { useGetGameListQuery } from 'services/contentApi'

export default function RecentlyPlayedSection() {
  const recent = useAppSelector((s) => s.setting.recentGames) ?? []

  const { gameList = [] } = useGetGameListQuery(
    {
      currency: Currency.VND,
      game_category: [],
      limit: 20,
      offset: 0,
      gdc_game_category: [],
      gdc_tag: [SlotType.JACKPOT],
    },
    {
      selectFromResult: ({ data }) => ({
        gameList: data?.data?.rows || [],
      }),
    }
  )

  // if (recent.length === 0) return null

  return (
    <DripsyGradient
      gradient="surface"
      sx={{ pb: ['$2'], mb: '$sectionBottomSpace' }}
    >
      <View sx={{ ml: '$pagePadding' }}>
        <SectionLabel
          icon="recently"
          title="RECENTLY PLAYED"
          sx={{ p: [6, '$2'], my: ['$1'] }}
          iconProps={{ sx: { fontSize: [12, 14] } }}
        />
      </View>
      <Row>
        <HorizontalGameList data={gameList} />
        <View>
          <DripsyGradient
            gradient="shading"
            start={{ x: 1, y: 0.5 }}
            end={{ x: 0, y: 0.5 }}
            sx={{
              position: 'absolute',
              zIndex: 12,
              height: [80, 110],
              width: 20,
              right: '100%',
            }}
          />
          <GameCard
            sx={{ mx: '$1' }}
            width={[80, 110]}
            height={[80, 110]}
            image={require('app/assets/images/game/vgaming.png')}
          />
        </View>
      </Row>
    </DripsyGradient>
  )
}
