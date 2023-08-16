import { View } from 'dripsy'

const AgentProvider = ({ children }) => {
  return <View sx={{ maxWidth: 'container', mx: 'auto' }}>{children}</View>
}

export default AgentProvider
