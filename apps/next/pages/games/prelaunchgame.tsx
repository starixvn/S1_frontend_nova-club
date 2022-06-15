import PreLaunchGame from 'app/features/games/PreLaunchGame'
import React, { ReactElement } from 'react'
import layouts from '../../layouts'
import TabLayout from '../../layouts/TabLayout'

PreLaunchGame.getLayout = layouts.COMMON()
export default PreLaunchGame
