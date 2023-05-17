import AgentResetPassword from 'agent/features/auth/AgentResetPassword'
import AgentChangePassword from 'agent/features/auth/AgentChangePassword'
import AgentStackLayout from '../../layouts/agent/AgentStackLayout'
import React from 'react'

const ResetPassword = () => {
  return (
    <AgentStackLayout sx={{ paddingTop: 0 }}>
      <AgentResetPassword />
    </AgentStackLayout>
  )
}

export default ResetPassword
