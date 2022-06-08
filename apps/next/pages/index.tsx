import HomeScreen from 'app/features/home/screen'
import TabLayout from '../layouts/TabLayout'
import React from 'react'
import { Text } from 'moti'

// @ts-expect-error: To be fix
HomeScreen.getLayout = function getLayout(page: ReactElement) {
  return <TabLayout>{page}</TabLayout>
}

export default HomeScreen
