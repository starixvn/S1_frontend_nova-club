import GameLoaderPage from 'app/features/games/GameLoaderPage'
import React, { ReactElement } from 'react'
import layouts from '../../layouts'
import TabLayout from '../../layouts/TabLayout'

GameLoaderPage.getLayout = layouts.COMMON()
export default GameLoaderPage
