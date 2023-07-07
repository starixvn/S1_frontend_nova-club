import GameListSectionAsyncByTag from 'app/components/game/GameListSectionAsyncByTag'
import AnnouncementSection from 'app/features/home/Announcement/AnnouncementSection'
import BannerSection from 'app/features/home/BannerSection'
import HireBanner from 'app/features/home/HireBanner'
import LeaderboardSection from 'app/features/home/LeaderboardSection'
import MatchSection from 'app/features/home/Match/MatchSection'
import ReferralSection from 'app/features/home/Referral/ReferralSection'
import TopGameSection from 'app/features/home/TopGameSection'
import useLocalization from 'app/provider/localization'
import { SlotType } from 'app/utils/constant'
import { Container, Row, Text, View } from 'dripsy'
import React from 'react'
import MiddleBanner from './MiddleBanner'
import DownloadScreen from '../download/DownloadScreen'

export default function HomeScreen() {
  const { t } = useLocalization()
  return (
    <View sx={{ pb: '$6' }}>
      <BannerSection />

      <Container sx={{ gap: '$sectionBottomSpace' }}>
        <View
          sx={{
            gap: '$sectionBottomSpace',
            pt: '$sectionBottomSpace',
            px: '$pagePadding',
          }}
        >
          <AnnouncementSection />
          <Row sx={{ gap: '$pagePadding' }}>
            <View sx={{ flex: 1 }}>
              <HireBanner />
            </View>
            <View sx={{ flex: 1 }}>
              <HireBanner />
            </View>
          </Row>
        </View>

        {/* <Row>
          <View sx={{ flex: 1 }}>
          </View>
          <View sx={{ flex: 1 }}>
          </View>
        </Row> */}
        {/* <Row>
          <View sx={{ flex: 2, mb: '$sectionBottomSpace' }}>
            <HireBanner />
       

          </View>
          <View sx={{ flex: 3 }}>
            <MatchSection />
          </View>
         
        </Row> */}

        <TopGameSection />

        <Row sx={{ gap: '$pagePadding' }}>
          <MiddleBanner sx={{ flex: 1, gap: '$pagePadding' }}></MiddleBanner>
          <View sx={{ flex: 1, gap: '$pagePadding' }}>
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
              title={t('game.megaway').toUpperCase()}
              icon="megaway"
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
        <View sx={{ py: '$4' }}>
          <DownloadScreen />
        </View>
      </Container>
    </View>
  )
}
