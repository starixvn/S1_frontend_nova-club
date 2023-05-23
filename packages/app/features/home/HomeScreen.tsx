import Banner from 'app/components/Banner'
import banners from 'app/dummy/banner'
import { ScrollView, useSx } from 'dripsy'
import AnnouncementSection from './Announcement/AnnouncementSection'

export default function HomeScreen() {
  const sx = useSx()

  return (
    <ScrollView showsVerticalScrollIndicator={false} sx={{ flex: 1 }}>
      <Banner data={banners} />
      <AnnouncementSection />
    </ScrollView>
  )
}
