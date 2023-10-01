import SlotMachine from 'app/features/event/halloween/SlotMachine'
import { AdaptiveLayoutPage } from 'components/layouts/AdaptiveLayout'
import { EmptyLayout } from 'components/layouts/desktop'
import { View } from 'dripsy'

const HalloweenWebPage = () => {
  return (
    <div
      style={{
        backgroundImage: 'linear-gradient(180deg, #3a017d, #060111)',
      }}
    >
      <View sx={{ maxWidth: 530, mx: 'auto', minHeight: '100vh' }}>
        <SlotMachine />
      </View>
    </div>
  )
}

const HalloweenPage: AdaptiveLayoutPage = HalloweenWebPage

HalloweenPage.DesktopLayout = EmptyLayout

export default HalloweenPage
