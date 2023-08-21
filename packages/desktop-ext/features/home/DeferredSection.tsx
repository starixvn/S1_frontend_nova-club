import GameListSectionAsyncByTag from 'app/components/game/GameListSectionAsyncByTag'
import LeaderboardSection from 'app/features/home/LeaderboardSection'
import ReferralSection from 'app/features/home/Referral/ReferralSection'
import MatchSection from 'app/features/sportsbook/MatchSection'
import useLocalization from 'app/provider/localization'
import { SlotType } from 'app/utils/constant'
import { Row, View } from 'dripsy'
import React from 'react'
import AppDownloadSection from '../download/AppDownloadSection'
import MiddleBanner from './MiddleBanner'

type Props = {}

export default function DeferredSection({}: Props) {
  const { t } = useLocalization()

  return (
    <View sx={{ gap: '$sectionBottomSpace', my: '$sectionBottomSpace' }}>
      <Row sx={{ gap: '$pagePadding' }}>
        <MiddleBanner sx={{ flex: 1, gap: '$pagePadding' }} />
        <View sx={{ flex: 1, gap: '$pagePadding' }}>
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
        </View>
      </Row>
      <Row sx={{ alignItems: 'stretch', gap: '$pagePadding' }}>
        <View
          sx={{
            flex: 1,
            gap: '$pagePadding',
            justifyContent: 'space-evenly',
          }}
        >
          <MatchSection />
          <ReferralSection />
        </View>
        <LeaderboardSection sx={{ flex: 1 }} />
      </Row>
      <AppDownloadSection />
    </View>
  )
}
