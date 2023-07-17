import PersonalMessagePage from 'agent/features/inbox/PersonalMessagePage'
import AgentNestedTabs from 'agent/navigation/components/AgentNestedTabNavigator/AgentNestedTabs'
import InboxRoutes from 'agent/navigation/routes/InboxRoutes'
import AgentLayout from '../../../layouts/agent/AgentLayout'
import React from 'react'

const Mail = () => {
  return (
    <>
      <AgentNestedTabs routes={InboxRoutes} />
      <PersonalMessagePage />
    </>
  )
}

Mail.getLayout = AgentLayout

export default Mail
