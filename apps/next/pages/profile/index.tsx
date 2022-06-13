import ProfileScreen from 'app/features/profile/index'
import React, { ReactElement } from 'react'
import TabLayout from '../../layouts/TabLayout'
import withContextualNav from 'app/navigation/web/withContextualNav'

ProfileScreen.getLayout = function getLayout(page: ReactElement) {
  return <TabLayout>{page}</TabLayout>
}

export default withContextualNav(ProfileScreen)
