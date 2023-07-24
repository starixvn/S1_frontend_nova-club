import AgentCommissionScreen from 'agent/features/report/AgentCommissionReport'
import ShareholderCommissionScreen from 'agent/features/report/ShareholderCommissionReport'
import TransactionScreen from 'agent/features/report/Transaction'
import { useUserInfoQuery } from 'agent/services/userApi'
import React from 'react'
import { createAgentNestedTabNavigator } from '../components/AgentNestedTabNavigator'
import ReportRoutes, { ReportRoutesParamList } from '../routes/ReportRoutes'
import { useAppSelector } from 'app/provider/redux/store'

const Tab = createAgentNestedTabNavigator<ReportRoutesParamList>(ReportRoutes)

const ReportNavigation = () => {
  const token = useAppSelector((s) => s.agent.access_token)
  const { isShareHolder } = useUserInfoQuery(undefined, {
    selectFromResult: ({ data }) => ({
      isShareHolder: data?.role === 'shareholder' ? true : false,
    }),
    skip: !token,
  })

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Commission"
        component={
          isShareHolder ? ShareholderCommissionScreen : AgentCommissionScreen
        }
      />
      <Tab.Screen name="Transaction" component={TransactionScreen} />
    </Tab.Navigator>
  )
}

export default ReportNavigation
