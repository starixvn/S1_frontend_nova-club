import FormContainer from 'app/components/form/FormContainer'
import useLocalization from 'app/provider/localization'
import dayjs from 'dayjs'
import { ScrollView, Text, View } from 'dripsy'
import React from 'react'
import LeaderboardTable from './components/LeaderboardTable'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'

const RankingScreen = () => {
  const { t } = useLocalization()
  const { bottom } = useSafeArea()
  return (
    <ScrollView>
      <FormContainer hidePadding sx={{ mb: bottom }}>
        <View>
          <Text sx={{ textAlign: 'center', p: 12 }}>
            {t('leaderboard.top10').toUpperCase()}
          </Text>
          <LeaderboardTable />
          <Text sx={{ textAlign: 'center', p: 12 }}>
            {`${t('common.lastUpdated')} ${dayjs().format('YYYY-MM-DD')}`}
          </Text>
        </View>
      </FormContainer>
    </ScrollView>
  )
}

export default RankingScreen
