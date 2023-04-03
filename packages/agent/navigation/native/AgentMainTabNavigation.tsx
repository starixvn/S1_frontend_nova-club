import AgentBarcodePage from 'agent/features/barcode/AgentBarcodePage'
import MemberListingPage from 'agent/features/member/MemberListingPage'
import Profile from 'agent/features/profile'
import Header from 'agent/navigation/Header'
import React from 'react'
import { createAgentTabNavigator } from '../components/AgentTabNavigator'
import AddNavigation from './AddNavigation'
import ListNavigation from './ListNavigation'
import ReportNavigation from './ReportNavigation'
import WalletNavigation from './WalletNavigation'

// const Tab = createMaterialTopTabNavigator()
// const Tab = createBottomTabNavigator()
const Tab = createAgentTabNavigator()

const AgentMainTabNavigation = () => {
  return (
    <>
      <Header />
      <Tab.Navigator
        screenOptions={{
          lazy: true,
          tabBarGap: 0,
          tabBarIndicator: () => null,
          animationEnabled: false,
        }}
      >
        <Tab.Screen name="AgentProfile" component={Profile} />
        <Tab.Screen name="Add" component={AddNavigation} />
        <Tab.Screen name="Wallet" component={WalletNavigation} />
        <Tab.Screen name="List" component={ListNavigation} />
        <Tab.Screen name="Report" component={ReportNavigation} />
        <Tab.Screen name="Member" component={MemberListingPage} />
        <Tab.Screen name="Barcode" component={AgentBarcodePage} />
      </Tab.Navigator>
    </>
  )
}

export default AgentMainTabNavigation
