import { ScrollView, View } from 'dripsy'
import React from 'react'
import MonthlyEvent from './components/MonthlyEvent'
import PointsCalculation from './components/PointsCalculation'
import { Button } from 'react-native'

const EventScreen = () => {
  return (
    <ScrollView sx={{ flex: 1 }}>
      <PointsCalculation />
      <View sx={{ mb: 12 }} />
      <MonthlyEvent />

      <View sx={{ mb: 48, bg: '$secondary.500' }}>
        <Button title="Terms & Condition" />
      </View>
    </ScrollView>
  )
}

export default EventScreen
