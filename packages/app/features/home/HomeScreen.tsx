import { ScrollView } from 'dripsy'
import AnnouncementSection from './Announcement/AnnouncementSection'
import BannerSection from './BannerSection'
import MatchSection from './Match/MatchSection'
import TopGameSection from './TopGameSection'
import JackpotGameSection from './JackpotGameSection'
import RecentlyPlayedSection from './RecentlyPlayedSection'
import GameGridSection from './GameGridSection'

export default function HomeScreen() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      sx={{ flex: 1 }}
      contentContainerSx={{ pb: '$5' }}
    >
      <BannerSection />
      <AnnouncementSection />
      <MatchSection />
      <GameGridSection />
      <RecentlyPlayedSection />
      <TopGameSection />
      <JackpotGameSection />
      <JackpotGameSection />
    </ScrollView>
  )
}
