import Icon from 'agent/components/Icon'
import AgentCommissionScreen from 'agent/features/report/AgentCommissionReport'
import ShareholderCommissionScreen from 'agent/features/report/ShareholderCommissionReport'
import TransactionScreen from 'agent/features/report/Transaction'
import { useUserInfoQuery } from 'agent/services/userApi'
import { useDripsyTheme } from 'dripsy'
import React from 'react'
import { createMyCustomNestedNavigator } from '../components/CustomNestedTabBar'

const Tab = createMyCustomNestedNavigator()

const ReportNavigation = () => {
  const { theme } = useDripsyTheme()
  const { isShareHolder } = useUserInfoQuery(undefined, {
    selectFromResult: ({ data }) => ({
      isShareHolder: data?.role === 'shareholder' ? true : false,
    }),
  })

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Commission"
        component={
          isShareHolder ? ShareholderCommissionScreen : AgentCommissionScreen
        }
        options={{
          title: 'report.commission',
          tabBarIcon: () => (
            <Icon name="shareholder" color={'white'} size={20} />
          ),
          tabBarActiveTintColor: theme.colors.$primaryAgent,
          tabBarInactiveTintColor: theme.colors.$inactivePrimaryAgent,
        }}
      />
      <Tab.Screen
        name="TransactionReport"
        component={TransactionScreen}
        options={{
          title: 'report.transaction',
          tabBarIcon: () => <Icon name="agent" color={'white'} size={20} />,
          tabBarActiveTintColor: theme.colors.$primaryAgent,
          tabBarInactiveTintColor: theme.colors.$inactivePrimaryAgent,
        }}
      />
    </Tab.Navigator>
  )
}

export default ReportNavigation
