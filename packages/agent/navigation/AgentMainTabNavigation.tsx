import AgentBarcodePage from 'agent/features/barcode/AgentBarcodePage'
import MemberListScreen from 'agent/features/member/MemberListingPage'
import Profile from 'agent/features/profile'
import Header from 'agent/navigation/Header'
import { useUserInfoQuery } from 'agent/services/userApi'
import { useDripsyTheme } from 'dripsy'
import React from 'react'
import Icon from '../components/Icon'
import AddAgentShareholderNavigation from './AddAgentShareholderNavigation'
import AgentShareholderListingNavigation from './AgentShareholderListingNavigation'
import { createMyNavigator } from './components/CustomNavigation'
import ReportNavigation from './ReportNavigation'
import WalletNavigation from './WalletNavigation'

// const Tab = createMaterialTopTabNavigator()
// const Tab = createBottomTabNavigator()
const Tab = createMyNavigator()

const AgentMainTabNavigation = () => {
  //get user info here
  const { theme } = useDripsyTheme()
  const { data } = useUserInfoQuery()
  const userData = data?.result?.data
  const isShareHolder = userData?.role === 'shareholder' ? true : false

  const AgentTab = (
    <>
      <Tab.Screen
        name="Wallet"
        component={WalletNavigation}
        options={{
          title: 'wallet.title',
          tabBarIcon: ({ color, size }) => (
            <Icon name="withdrawal-transfer" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Member"
        component={MemberListScreen}
        options={{
          title: 'member.title',
          tabBarIcon: ({ color, size }) => (
            <Icon name="agent" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Report"
        component={ReportNavigation}
        options={{
          title: 'report.title',
          tabBarIcon: ({ color, size }) => (
            <Icon name="report" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Barcode"
        component={AgentBarcodePage}
        options={{
          title: 'barcode.title',
          tabBarIcon: ({ color, size }) => (
            <Icon name="qr-code" color={color} size={size} />
          ),
        }}
      />
    </>
  )

  const ShareholderTab = (
    <>
      <Tab.Screen
        name="Add"
        component={AddAgentShareholderNavigation}
        options={{
          title: 'shAgent.add',
          tabBarIcon: ({ color, size }) => (
            <Icon name="add-agent" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletNavigation}
        options={{
          title: 'wallet.title',
          tabBarIcon: ({ color, size }) => (
            <Icon name="withdrawal-transfer" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Shareholder/Agent"
        component={AgentShareholderListingNavigation}
        options={{
          title: 'report.title',
          tabBarIcon: ({ color, size }) => (
            <Icon name="shareholder-agent" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Report"
        component={ReportNavigation}
        options={{
          title: 'report.title',
          tabBarIcon: ({ color, size }) => (
            <Icon name="report" color={color} size={size} />
          ),
        }}
      />
    </>
  )

  return (
    <>
      <Header userData={userData} />
      <Tab.Navigator
        screenOptions={{
          lazy: true,
          tabBarActiveTintColor: theme.colors.$primaryAgent,
          tabBarInactiveTintColor: '#335DA0',
          tabBarLabelStyle: {
            fontSize: 12,
            lineHeight: 12,
            minHeight: 20,
            textTransform: 'none',
          },
          tabBarGap: 0,
          tabBarItemStyle: { paddingHorizontal: 4, marginTop: 5 },
          tabBarIndicator: () => null,
          animationEnabled: false,
        }}
      >
        {/* <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ color }) => <Icon name="table" color={color} />,
          }}
        /> */}
        <Tab.Screen
          name="AgentProfile"
          component={Profile}
          options={{
            title: 'shAgent.title',
            tabBarIcon: ({ color, size }) => (
              <Icon name="agent" color={color} size={size} />
            ),
            tabBarVisible: false,
            tabBarButton: () => null,
          }}
        />
        {isShareHolder ? ShareholderTab : AgentTab}
      </Tab.Navigator>
    </>
  )
}

export default AgentMainTabNavigation
