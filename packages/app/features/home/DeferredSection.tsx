import GameListSectionAsyncByTag from 'app/components/game/GameListSectionAsyncByTag'
import useLocalization from 'app/provider/localization'
import { SlotType } from 'utils/constant'
import { View } from 'dripsy'
import React from 'react'
import LeaderboardSection from './LeaderboardSection'
import LuckyDrawTrigger from './LuckyDrawTrigger'
import MatchSection from './Match/MatchSection'
import ReferralSection from './Referral/ReferralSection'

type Props = {}

export default function DeferredSection({}: Props) {
  const { t } = useLocalization()

  return (
    <View sx={{ gap: ['$3', '$4'] }}>
      <GameListSectionAsyncByTag
        tag={SlotType.NEW}
        title={t('game.new').toUpperCase()}
        icon="star"
        seeMoreUrl="/tag/new"
      />
      <GameListSectionAsyncByTag
        tag={SlotType.JACKPOT}
        title={t('game.jackpot').toUpperCase()}
        icon="jackpot"
        seeMoreUrl="/tag/jackpot"
      />
      <GameListSectionAsyncByTag
        tag={SlotType.MEGAWAY}
        title={t('game.megaway').toUpperCase()}
        icon="megaway"
        seeMoreUrl="/tag/megaway"
      />
      <MatchSection />
      <LeaderboardSection />
      <ReferralSection />
      <LuckyDrawTrigger />
    </View>
  )
}
