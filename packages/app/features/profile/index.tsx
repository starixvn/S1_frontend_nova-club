import Avatar from 'app/components/Avatar'
import { ScrollView, Text } from 'dripsy'
import React from 'react'
import ProfileAction from './ProfileAction'
import ProfileBalance from './ProfileBalance'
import ProfileLanguage from './ProfileLanguage'
import ProfileOptions from './ProfileOptions'
import ProfileOverview from './ProfileOverview'
import ProfileUser from './ProfileUser'

const ProfileScreen = () => {
  return (
    <ScrollView
      sx={{ bg: '$background', flex: 1, pt: 2 }}
      showsVerticalScrollIndicator={false}
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
