import AgentProfile from 'agent/features/profile'
import React from 'react'
import AgentLayout from 'components/layouts/agent/AgentLayout'

const Agent = () => {
  return <AgentProfile />
}

Agent.getLayout = AgentLayout

export default Agent
