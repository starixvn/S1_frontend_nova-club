import { DripsyGradient } from 'app/components/Gradient'
import AgentBarcodeCard from './AgentBarcodeCard'

const AgentBarcodePage = () => {
  return (
    <DripsyGradient
      locations={[0.0, 0.1]}
      gradient="agentContent"
      sx={{
        pt: '$5',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <AgentBarcodeCard />
    </DripsyGradient>
  )
}

export default AgentBarcodePage
