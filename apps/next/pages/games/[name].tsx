import Games from 'app/features/games'
import React, { ReactElement } from 'react'
import TabLayout from '../../layouts/TabLayout'

// @ts-expect-error: To be fix
Games.getLayout = function getLayout(page: ReactElement) {
  return <TabLayout>{page}</TabLayout>
}

export default Games
