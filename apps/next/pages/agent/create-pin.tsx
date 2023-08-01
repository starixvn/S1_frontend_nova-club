import AgentCreatePin from 'agent/features/pin/AgentCreatePin'
import { MobileStackAgentLayout } from 'components/layouts/agent'
import AgentStackLayout from 'components/layouts/agent/AgentStackLayout'

const CreatePin = () => {
  return <AgentCreatePin />
}

CreatePin.AgentLayout = MobileStackAgentLayout

export default CreatePin
