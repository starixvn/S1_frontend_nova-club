import GameListSectionAsyncByTag from 'app/components/game/GameListSectionAsyncByTag'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import React from 'react'
import { SlotType } from 'utils/constant'
import LeaderboardSection from './LeaderboardSection'
import MatchSection from './Match/MatchSection'
import ReferralSection from './Referral/ReferralSection'
import { CnyFlower2, CnyLantern } from './CnyTheme'
import useDefaultParamSelector from 'app/hooks/useDefaultParamSelector'

type Props = {}

export default function DeferredSection({}: Props) {
  const { t } = useLocalization()

  return (
    <View sx={{ gap: ['$3', '$4'] }}>
      <GameListSectionAsyncByTag
        key={currency + locale + 0}
        tag={SlotType.NEW}
        title={t('game.new').toUpperCase()}
        icon="star"
        seeMoreUrl="/tag/new"
      />

      <GameListSectionAsyncByTag
        key={currency + locale + 1}
        tag={SlotType.JACKPOT}
        title={t('game.jackpot').toUpperCase()}
        icon="jackpot"
        seeMoreUrl="/tag/jackpot"
      />
      <GameListSectionAsyncByTag
        key={currency + locale + 2}
        tag={SlotType.MEGAWAY}
        title={t('game.megaway').toUpperCase()}
        icon="megaway"
        seeMoreUrl="/tag/megaway"
      />
      <MatchSection />
      <LeaderboardSection />
      <ReferralSection />
    </View>
  )
}
