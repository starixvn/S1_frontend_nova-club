import React from 'react'
import AgentBarcodePage from 'agent/features/barcode/AgentBarcodePage'
import AgentLayout from 'components/layouts/agent/AgentLayout'
import { MobileAgentLayout } from 'components/layouts/agent'

const Barcode = () => {
  return <AgentBarcodePage />
}

Barcode.AgentLayout = MobileAgentLayout

export default Barcode
