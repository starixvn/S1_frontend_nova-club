import useOrientation from 'app/hooks/useOrientation'
import { ScrollView } from 'dripsy'
import { default as React, useEffect } from 'react'
import { useModal } from 'react-native-modalfy'
import { createParam } from 'solito'
import AnnouncementMarquee from './Section/AnnouncementMarquee'
import BannerSection from './Section/BannerSection'
import GridSection from './Section/GridSection'
import HotGamesSection from './Section/HotGamesSection'
import Jackpot from './Section/Jackpot'
import MatchesSection from './Section/MatchesSection'
import RecentOpenGames from './Section/RecentOpenGames'

type Query = {
  luckySpinBalance: number
}

const { useParam } = createParam<Query>()
const HomeScreen = () => {
  const { isLandscape } = useOrientation()
  const { openModal } = useModal()

  const [luckySpinBalance] = useParam('luckySpinBalance')

  useEffect(() => {
    if (luckySpinBalance && luckySpinBalance > 0) {
      setTimeout(() => {
        openModal('LuckyDrawModal', { totalSpin: luckySpinBalance })
      }, 100)
    }
  }, [])

  return (
    <ScrollView
      bounces={false}
      sx={{ bg: '$background', flex: 1 }}
      showsVerticalScrollIndicator={false}
    >
      {!isLandscape && <BannerSection />}
      <AnnouncementMarquee />
      <MatchesSection />
      <GridSection />
      <RecentOpenGames />
      <HotGamesSection />
      <Jackpot />
    </ScrollView>
  )
}

export default HomeScreen
