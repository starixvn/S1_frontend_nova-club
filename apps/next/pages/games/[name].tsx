import Games from 'app/features/games'
import React, { ReactElement } from 'react'
import layouts from '../../layouts'
import TabLayout from '../../layouts/TabLayout'

Games.getLayout = layouts.TAB()

export default Games
