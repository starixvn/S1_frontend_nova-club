import { DripsyGradient } from 'app/components/Gradient'
import SectionLabel from 'app/components/SectionLabel'
import GameCard from 'app/components/game/GameCard'
import HorizontalGameList from 'app/components/game/HorizontalGameList'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { Currency, SlotType } from 'app/utils/constant'
import { Row, View } from 'dripsy'
import React from 'react'
import { useGetGameListQuery } from 'services/gameApi'

export default function RecentlyPlayedSection() {
  const recent = useAppSelector((s) => s.setting.recentGames) ?? []
  const { t } = useLocalization()

  const { gameList = [] } = useGetGameListQuery(
    {
      currency: Currency.VND,
      game_category: [],
      limit: 1,
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
  const vgaming = require('app/assets/images/game/vgaming.png')

  return (
    <DripsyGradient
      gradient="surface"
      sx={{ pb: ['$2', '$3', '$3'], mb: '$sectionBottomSpace' }}
    >
      <View sx={{ height: 1, bg: '$primary.100' }} />
      <View sx={{ ml: '$pagePadding' }}>
        <SectionLabel
          icon="recently"
          title={t('game.recently').toUpperCase()}
          sx={{ p: [6, '$2'], my: [0] }}
          iconProps={{ sx: { fontSize: [12, 14] } }}
        />
      </View>
      <Row>
        <View sx={{ position: 'relative', zIndex: 1, ml: ['$3'] }}>
          <DripsyGradient
            gradient="shading"
            end={{ x: 1, y: 0.5 }}
            start={{ x: 0, y: 0.5 }}
            sx={{
              position: 'absolute',
              zIndex: 13,
              height: [50, 70],
              width: 20,
              left: '100%',
            }}
          />
          <GameCard
            sx={{ mx: '$1' }}
            width={[50, 70]}
            height={[50, 70]}
            // image={vgaming}
          />
        </View>
        <HorizontalGameList data={gameList} size={[50, 70]} />
      </Row>
    </DripsyGradient>
  )
}
