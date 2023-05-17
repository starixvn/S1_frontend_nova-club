import React from 'react'
import AgentLayout from '../../layouts/agent/AgentLayout'
import MemberListingPage from 'agent/features/member/MemberListingPage'

const Member = () => {
  return <MemberListingPage />
}

Member.getLayout = AgentLayout

export default Member
