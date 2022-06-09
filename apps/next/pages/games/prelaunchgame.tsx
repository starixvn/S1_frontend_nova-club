import PreLaunchGame from 'app/features/games/PreLaunchGame'
import React, { ReactElement } from 'react'
import TabLayout from '../../layouts/TabLayout'

PreLaunchGame.getLayout = function getLayout(page: ReactElement) {
  return <TabLayout>{page}</TabLayout>
}
export default PreLaunchGame
