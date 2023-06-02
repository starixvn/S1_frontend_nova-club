import { ScrollView, View } from 'dripsy'
import React from 'react'
import MonthlyEvent from './components/MonthlyEvent'
import PointsCalculation from './components/PointsCalculation'
import Button from 'app/components/common/Button'
import useLocalization from 'app/provider/localization'

const EventScreen = () => {
  const { t } = useLocalization()
  return (
    <ScrollView sx={{ flex: 1 }}>
      <PointsCalculation />
      <View sx={{ mb: 12 }} />
      <MonthlyEvent />

      <View sx={{ mb: 48, bg: '$secondary.500' }}>
        <Button>{t('common.tnc')}</Button>
      </View>
    </ScrollView>
  )
}

export default EventScreen
