import useLocalization from 'app/provider/localization'
import dayjs from 'dayjs'
import { Text, View } from 'dripsy'
import React from 'react'
import LeaderboardTable from './components/LeaderboardTable'
import DesktopPageContainer from 'desktop-ext/components/layout/DesktopPage'

const RankingScreen = () => {
  const { t } = useLocalization()

  return (
    <DesktopPageContainer>
      <View sx={{ flexGrow: 1 }}>
        <Text sx={{ textAlign: 'center', p: 12 }}>
          {t('leaderboard.top10').toUpperCase()}
        </Text>

        <LeaderboardTable />

        <Text sx={{ textAlign: 'center', p: 12 }}>
          {`${t('common.lastUpdated')} ${dayjs().format('YYYY-MM-DD')}`}
        </Text>
      </View>
    </DesktopPageContainer>
  )
}

export default RankingScreen
