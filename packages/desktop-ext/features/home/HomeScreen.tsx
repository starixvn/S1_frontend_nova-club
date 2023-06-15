import AnnouncementSection from 'app/features/home/Announcement/AnnouncementSection'
import BannerSection from 'app/features/home/BannerSection'
import React from 'react'
import { View, Container, Row } from 'dripsy'
import MatchSection from 'app/features/home/Match/MatchSection'
import RecentlyPlayedSection from 'app/features/home/RecentlyPlayedSection'
import TopGameSection from 'app/features/home/TopGameSection'
import GameListSectionAsyncByTag from 'app/components/game/GameListSectionAsyncByTag'
import { SlotType } from 'app/utils/constant'
import useLocalization from 'app/provider/localization'
import HireBanner from 'app/features/home/HireBanner'
import LeaderboardSection from 'app/features/home/LeaderboardSection'
import MiddleBanner from './MiddleBanner'

export default function HomeScreen() {
  const { t } = useLocalization()
  return (
    <View sx={{pb: "$6"}}>
      <BannerSection />
      <Container>
        <AnnouncementSection />
        <HireBanner />
        <MatchSection />
        <RecentlyPlayedSection />
        <TopGameSection />
        <GameListSectionAsyncByTag
          tag={SlotType.NEW}
          title={t('game.new').toUpperCase()}
          icon="star"
        />
        <GameListSectionAsyncByTag
          tag={SlotType.JACKPOT}
          title={t('game.jackpot').toUpperCase()}
          icon="jackpot"
        />
        <GameListSectionAsyncByTag
          tag={SlotType.MEGAWAY}
          title={'MEGAWAY'}
          icon="megaway"
        />
        <Row>
          <MiddleBanner sx={{ flex: 1 }}></MiddleBanner>
          <LeaderboardSection sx={{ flex: 1 }} />
        </Row>
      </Container>
    </View>
  )
}
