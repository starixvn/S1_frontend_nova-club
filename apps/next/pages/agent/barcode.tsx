import React from 'react'
import AgentLayout from '../../layouts/agent/AgentLayout'
import AgentBarcodePage from 'agent/features/barcode/AgentBarcodePage'

const Barcode = () => {
  return <AgentBarcodePage />
}

Barcode.getLayout = AgentLayout

export default Barcode
