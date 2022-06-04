import { ScrollView, Text } from 'dripsy'
import React from 'react'
import { RefreshControl } from 'react-native'
import ProfileAction from './ProfileAction'
import ProfileBalance from './ProfileBalance'
import ProfileLanguage from './ProfileLanguage'
import ProfileOptions from './ProfileOptions'
import ProfileOverview from './ProfileOverview'
import ProfileUser from './ProfileUser'

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

const ProfileScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    console.log('refresh profile')
    wait(2000).then(() => setRefreshing(false))
  }, [])

  return (
    <ScrollView
      sx={{ bg: '$background', flex: 1, pt: 2 }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <ProfileUser />
      <ProfileBalance />
      <Text sx={{ textAlign: 'center' }}>UTC/GMT +7</Text>
      <ProfileAction />
      <ProfileOverview />
      <ProfileOptions />
      <ProfileLanguage />
    </ScrollView>
  )
}

export default ProfileScreen
