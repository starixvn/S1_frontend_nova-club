import { useUserInfoQuery } from 'agent/services/userApi'
import { DripsyGradient } from 'app/components/Gradient'
import AgentBarcodeCard from './AgentBarcodeCard'

const AgentBarcodePage = () => {
  const { userId, isUserInfoLoading } = useUserInfoQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      userId: data?.id,
      isUserInfoLoading: isLoading,
    }),
  })

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
      <AgentBarcodeCard userId={userId ?? 0} />
    </DripsyGradient>
  )
}

export default AgentBarcodePage
