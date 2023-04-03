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
      sx={{ justifyContent: 'center', pt: 0, height: '80%' }}
      colors={['rgb(224,237,254)', '#ffffff']}
    >
      <AgentBarcodeCard userId={userId ?? 0} />
    </DripsyGradient>
  )
}

export default AgentBarcodePage
