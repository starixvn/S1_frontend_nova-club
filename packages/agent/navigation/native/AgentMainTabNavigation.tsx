import CommissionTable from 'agent/features/commision'
import MemberListingPage from 'agent/features/member/MemberListingPage'
import Profile from 'agent/features/profile'
import Header from 'agent/navigation/Header'
import React from 'react'
import { createAgentTabNavigator } from '../components/AgentTabNavigator'
import AddAgentShareholderNavigation from './AddAgentShareholderNavigation'
import AgentShareholderListingNavigation from './AgentShareholderListingNavigation'
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
        <Tab.Screen name="Add" component={AddAgentShareholderNavigation} />
        <Tab.Screen name="List" component={AgentShareholderListingNavigation} />
        <Tab.Screen name="Report" component={ReportNavigation} />
        <Tab.Screen name="Wallet" component={WalletNavigation} />
        <Tab.Screen name="Member" component={MemberListingPage} />
        <Tab.Screen name="Barcode" component={CommissionTable} />
      </Tab.Navigator>
    </>
  )
}

export default AgentMainTabNavigation
