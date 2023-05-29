import { ScrollView } from 'dripsy'
import AnnouncementSection from './Announcement/AnnouncementSection'
import BannerSection from './BannerSection'
import MatchSection from './Match/MatchSection'

export default function HomeScreen() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} sx={{ flex: 1 }}>
      <BannerSection />
      <AnnouncementSection />
      <MatchSection />
    </ScrollView>
  )
}
