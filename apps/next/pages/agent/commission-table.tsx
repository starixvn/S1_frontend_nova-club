import React from 'react'
import AgentCommissionPage from 'agent/features/commision'
import AgentStackLayout from 'components/layouts/agent/AgentStackLayout'
import { MobileStackAgentLayout } from 'components/layouts/agent'

export default function Commission() {
  return <AgentCommissionPage />
}

Commission.AgentLayout = MobileStackAgentLayout
