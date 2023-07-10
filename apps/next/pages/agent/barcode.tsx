import React from 'react'
import AgentBarcodePage from 'agent/features/barcode/AgentBarcodePage'
import AgentLayout from 'components/layouts/agent/AgentLayout'

const Barcode = () => {
  return <AgentBarcodePage />
}

Barcode.getLayout = AgentLayout

export default Barcode
