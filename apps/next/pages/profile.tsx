import ProfileScreen from 'app/features/profile/index'
import React, { ReactElement } from 'react'
import TabLayout from '../layouts/TabLayout'

ProfileScreen.getLayout = function getLayout(page: ReactElement) {
  return <TabLayout>{page}</TabLayout>
}

export default ProfileScreen
