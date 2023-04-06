import AgentResetPassword from 'agent/features/auth/AgentResetPassword'
import AgentChangePassword from 'agent/features/auth/AgentChangePassword'
import AgentStackLayout from '../../layouts/agent/AgentStackLayout'
import React from 'react'

const ChangePassword = () => {
  return (
    <AgentStackLayout>
      <AgentChangePassword />
    </AgentStackLayout>
  )
}

export default ChangePassword
