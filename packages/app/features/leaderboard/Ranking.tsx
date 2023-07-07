import FormContainer from 'app/components/form/FormContainer'
import useLocalization from 'app/provider/localization'
import dayjs from 'dayjs'
import { Text, View } from 'dripsy'
import React from 'react'
import LeaderboardTable from './components/LeaderboardTable'

const RankingScreen = () => {
  const { t } = useLocalization()

  return (
    <FormContainer padding>
      <View sx={{ flexGrow: 1 }}>
        <Text sx={{ textAlign: 'center', p: 12 }}>
          {t('leaderboard.top10').toUpperCase()}
        </Text>

        <LeaderboardTable />

        <Text sx={{ textAlign: 'center', p: 12 }}>
          {`${t('common.lastUpdated')} ${dayjs().format('YYYY-MM-DD')}`}
        </Text>
      </View>
    </FormContainer>
  )
}

export default RankingScreen
