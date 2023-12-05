import { prepareTolgeeStaticDataByNamespace } from 'app/provider/localization'
import { View } from 'dripsy'

import vi from 'agent/assets/locales/agent-vi.json'
import { LANGUAGE_NAMESPACE } from 'utils/constant'
import { tolgee } from 'app/integrations/tolgee'

// This is current imported on Web only, APP's registration is one on /agent/_layout.tsx
tolgee.addStaticData(
  prepareTolgeeStaticDataByNamespace(LANGUAGE_NAMESPACE.AGENT, vi)
)

const AgentProvider = ({ children }) => {
  return <View sx={{ maxWidth: 'container', mx: 'auto' }}>{children}</View>
}

export default AgentProvider
