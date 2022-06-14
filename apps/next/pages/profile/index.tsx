import ProfileScreen from 'app/features/profile/index'
import React, { ReactElement } from 'react'
import TabLayout from '../../layouts/TabLayout'
import withContextualNav from 'app/navigation/web/withContextualNav'
import layouts from '../../layouts'

ProfileScreen.getLayout = layouts.TAB()

export default ProfileScreen
