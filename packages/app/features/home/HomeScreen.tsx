import GameListSectionAsyncByTag from 'app/components/game/GameListSectionAsyncByTag'
import useLocalization from 'app/provider/localization'
import { SlotType } from 'app/utils/constant'
import { ScrollView } from 'dripsy'
import AnnouncementSection from './Announcement/AnnouncementSection'
import BannerSection from './BannerSection'
import GameGridSection from './GameGridSection'
import MatchSection from './Match/MatchSection'
import RecentlyPlayedSection from './RecentlyPlayedSection'
import TopGameSection from './TopGameSection'
import LeaderboardSection from './LeaderboardSection'
import ReferralSection from './Referral/ReferralSection'
import Footer from 'app/components/navigation/footer'

export default function HomeScreen() {
  const { t } = useLocalization()
  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      sx={{ flex: 1 }}
      contentContainerSx={{ pb: '$5' }}
    >
      <BannerSection />
      <AnnouncementSection />

      <GameGridSection />
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
      <MatchSection />
      <LeaderboardSection />
      <ReferralSection />
      <Footer />
    </ScrollView>
  )
}
