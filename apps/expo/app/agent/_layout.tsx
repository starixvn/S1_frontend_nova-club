import { tolgee } from 'app/integrations/tolgee'
import { prepareTolgeeStaticDataByNamespace } from 'app/provider/localization'
import { Stack } from 'expo-router'
import { View } from 'react-native'
import { LANGUAGE_NAMESPACE } from 'utils/constant'

import vi from 'agent/assets/locales/agent-vi.json'

tolgee.addStaticData(
  prepareTolgeeStaticDataByNamespace(LANGUAGE_NAMESPACE.AGENT, vi)
)

export default function Root() {
  return (
    <View style={{ flex: 1 }}>
      {/* <Header /> */}
      {/* <AgentShareholderTabBar /> */}
      {/* <AnnouncementSection /> */}
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  )
}
