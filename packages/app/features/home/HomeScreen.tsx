import Banner from 'app/components/Banner'
import banners from 'app/dummy/banner'
import { ScrollView } from 'dripsy'
import AnnouncementSection from './Announcement/AnnouncementSection'
import MatchSection from './Match/MatchSection'

export default function HomeScreen() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} sx={{ flex: 1 }}>
      <Banner data={banners} />
      <AnnouncementSection />
      <MatchSection />
    </ScrollView>
  )
}
