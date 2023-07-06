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

export default function HomeScreen() {
  const { t } = useLocalization()
  return (
    <View sx={{ pb: '$6' }}>
      <BannerSection />

      <Container>
        <AnnouncementSection />
        <Row sx={{mb: "$sectionBottomSpace"}}>
          <View sx={{ flex: 1 }}>
            <HireBanner />
          </View>
          <View sx={{ flex: 1 }}>
            <HireBanner />
          </View>
        </Row>

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

        <Row sx={{ pl: ["$3"] }}>
          <MiddleBanner sx={{ flex: 1 }}></MiddleBanner>
          <View sx={{ flex: 1 }}>
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

        <Row>
          <View sx={{ flex: 1, justifyContent: 'space-evenly' }}>
            <MatchSection />
            <ReferralSection />
          </View>
          <LeaderboardSection sx={{ flex: 1 }} />
        </Row>
        <View
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            aspectRatio: 1920 / 500,
            bg: '$secondary.500',
          }}
        >
          <Text sx={{ fontSize: 30, fontWeight: '900' }}>
            APP DOWNLOAD BANNER
          </Text>
        </View>
      </Container>
    </View>
  )
}
